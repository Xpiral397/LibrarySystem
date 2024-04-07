from django.urls import path
from users import views

urlpatterns = [
    path('register/', views.register_user, name='register'),
    path('verify-otp/', views.verify_otp, name='verify_otp'),
    path('login/', views.login_user, name='login'),
    path('refresh-token/', views.refresh_token, name='refresh_token'),
]
