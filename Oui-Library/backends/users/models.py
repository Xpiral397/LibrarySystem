from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from admin.models import Book, Balance
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    def create_user(self, matric_number, full_name, department, expected_year_of_graduation, password=None, **extra_fields):
        if not matric_number:
            raise ValueError('The Matric Number field must be set')
        user = self.model(matric_number=matric_number, full_name=full_name, department=department, expected_year_of_graduation=expected_year_of_graduation, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, matric_number, full_name, department, expected_year_of_graduation, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(full_name =full_name, password = password, matric_number = 'N/A', department="Administrator", expected_year_of_graduation="N/A", **extra_fields)

class UserAccount(AbstractBaseUser):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True) 
    department = models.CharField(max_length=100)
    faculty = models.CharField(max_length=100)
    gender = models.CharField(max_length=100)
    number = models.CharField(max_length=20)
    expected_year_of_graduation = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    matric_number = models.CharField(max_length=50, unique=True)
    full_name = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    expected_year_of_graduation = models.IntegerField()
    otp = models.IntegerField(default=0)
    has_confirm_otp = models.BooleanField(default=False)
    otp_expiration_time = models.IntegerField(default=0)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    balance = models.OneToOneField(Balance, verbose_name=_(""), on_delete=models.CASCADE)

    objects = CustomUserManager()

    USERNAME_FIELD = 'matric_number'
    REQUIRED_FIELDS = ['full_name', 'department', 'expected_year_of_graduation']

    def __str__(self):
        return self.matric_number


class Borrowing(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    borrow_date = models.DateField(default=timezone.now)
    return_date = models.DateField(null=True, blank=True)
    is_returned = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.matric_number} borrowed {self.book.title}"

class ReservedBook(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    reserved_instances = models.IntegerField(default=0)

    def reserve_book(self):
        if self.book.quantity > 0:
            self.reserved_instances += 1
            self.book.quantity -= 1
            self.book.save()
            self.save()

    def cancel_reservation(self):
        if self.reserved_instances > 0:
            self.reserved_instances -= 1
            self.book.quantity += 1
            self.book.save()
            self.save()

    def __str__(self):
        return f"{self.book.title} - Reserved Instances: {self.reserved_instances}"

class PaymentAlert(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    alert_date = models.DateField()
    amount_due = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Payment alert for {self.user.matric_number} for book {self.book.title} due on {self.alert_date}"
