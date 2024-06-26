from rest_framework import serializers
from share.models import   Book, UserAccount
from django.contrib.auth import get_user_model
from share.models import AdminAccount
UserModel = get_user_model()



class UserCreateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    matric_number = serializers.CharField(required=True)
    number = serializers.CharField(required=True)
    full_name = serializers.CharField(required=True)
    faculty = serializers.CharField(required=True)
    department = serializers.CharField(required=True)
    expected_year_of_graduation = serializers.CharField(required=True)
    gender = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)  

    class Meta:
        model = UserModel
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        print(validated_data)
        user = UserModel.objects.create_user(**validated_data)
        return user
    
    
class CreateAdminSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    number = serializers.CharField(required=True)
    full_name = serializers.CharField(required=True)
    gender = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    class Meta:
        model = AdminAccount
        fields = ['name', 'email', 'number', 'full_name', 'gender', 'password']
        # extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        admin = AdminAccount.objects.create_admin(**validated_data)
        return admin

# class GenreSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Genre
#         fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

# class BorrowingSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Borrowing
#         fields = '__all__'

# class PaymentAlertSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PaymentAlert
#         fields = '__all__'

# class UserAccountSerializer(serializers.ModelSerializer):
#     borrowed_books = BookSerializer(many=True, read_only=True)
#     payment_alerts = PaymentAlertSerializer(many=True, read_only=True)

#     class Meta:
#         model = UserAccount
#         fields = ['id', 'email', 'username', 'date_of_birth', 'preferred_language', 'favorite_option', 'occupation', 'borrowed_books', 'payment_alerts']
