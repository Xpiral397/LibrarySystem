from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import UserAccount
from .email import SendEmail
from .serializers import UserCreateSerializer
from .utils import getOTP
from datetime import datetime, timedelta
from django.utils import timezone
import json

@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        data = json.load(request)
        serializer = UserCreateSerializer(data =data)
        if serializer.is_valid():
            user = serializer.save()
            otp = getOTP()
            user.otp = otp
            user.otp_expiration_time = datetime.timestamp(datetime.now() + timedelta(minutes=5))
            user.save()
            email = SendEmail(data['email'])
            email.SendAccountSuccessEmail(otp);
            # Send OTP to user's mobile number (implementation required)
            return JsonResponse({'message': 'Registration successful. Please verify Your OTP.'})
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def verify_otp(request):
    if request.method == 'POST':
        matric_number = request.POST.get('matric_number')
        otp_entered = request.POST.get('otp')
        try:
            user = UserAccount.objects.get(matric_number=matric_number)
            _unexpiredOTP = datetime.now().timestamp() * 1000 < user.otp_expiration_time
            if user.otp == otp_entered and _unexpiredOTP:
                user.has_registration_completed = True
                user.save()
                return JsonResponse({'message': 'OTP verification successful. Registration completed.'})
            return JsonResponse({'error': 'Invalid OTP. Please try again.'}, status=400)
        except UserAccount.DoesNotExist:
            return JsonResponse({'error': 'User not found.'}, status=400)

from django.contrib.auth import authenticate
import jwt

@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        matric_number = request.POST.get('matric_number')
        password = request.POST.get('password')

        if matric_number and password:
            user = authenticate(matric_number=matric_number, password=password)
            if user:
                # Generate access token and refresh token
                access_token, refresh_token = generate_tokens(user)
                return JsonResponse({'access_token': access_token, 'refresh_token': refresh_token})
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=400)
        else:
            return JsonResponse({'error': 'Missing credentials'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
       

@csrf_exempt
def refresh_token(request):
    if request.method == 'POST':
        # Get refresh token from request data
        refresh_token = request.POST.get('refresh_token')
        if refresh_token:
            # Verify refresh token
            try:
                refresh_token_payload = jwt.decode(refresh_token, 'your_refresh_token_secret_key', algorithms=['HS256'])
                # Check if the refresh token is not expired
                if timezone.now() < timezone.datetime.fromtimestamp(refresh_token_payload['exp']):
                    # Get user_id from refresh token payload
                    user_id = refresh_token_payload['user_id']
                    # Generate new access token
                    access_token = generate_access_token(user_id)
                    return JsonResponse({'access_token': access_token})
                else:
                    return JsonResponse({'error': 'Refresh token has expired'}, status=400)
            except jwt.ExpiredSignatureError:
                return JsonResponse({'error': 'Refresh token has expired'}, status=400)
            except jwt.InvalidTokenError:
                return JsonResponse({'error': 'Invalid refresh token'}, status=400)
        else:
            return JsonResponse({'error': 'Refresh token is missing'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


def generate_tokens(user):
    # Set token expiration time for access token (for example, 1 hour)
    access_token_exp_time = timezone.now() + timedelta(hours=1)
    # Set token expiration time for refresh token (for example, 7 days)
    refresh_token_exp_time = timezone.now() + timedelta(days=7)
    
    # Generate access token payload
    access_token_payload = {
        'user_id': user.id,
        'username': user.username,
        'exp': access_token_exp_time,
    }
    # Generate access token
    access_token = jwt.encode(access_token_payload, 'your_access_token_secret_key', algorithm='HS256')

    # Generate refresh token payload
    refresh_token_payload = {
        'user_id': user.id,
        'exp': refresh_token_exp_time,
    }
    # Generate refresh token
    refresh_token = jwt.encode(refresh_token_payload, 'your_refresh_token_secret_key', algorithm='HS256')

    return access_token.decode('utf-8'), refresh_token.decode('utf-8')

def generate_access_token(user_id):
    # Set token expiration time for access token (for example, 1 hour)
    access_token_exp_time = timezone.now() + timedelta(hours=1)
    # Generate access token payload
    access_token_payload = {
        'user_id': user_id,
        'exp': access_token_exp_time,
    }
    # Generate access token
    access_token = jwt.encode(access_token_payload, 'your_access_token_secret_key', algorithm='HS256')
    return access_token.decode('utf-8')
