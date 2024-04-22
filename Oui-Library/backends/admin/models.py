from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import models
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    def create_admin(self, password=None, **extra_fields):
        user = self.model(**extra_fields)
        user.set_password(password)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        user.save(using=self._db)
        return user
    


class Balance(models.Model):
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_lent_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_reserved_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"Balance for {self.total_amount}"

  
class AdminAccount(AbstractBaseUser):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True) 
    
    gender = models.CharField(max_length=100)
    number = models.CharField(max_length=20)
        
        
    password = models.CharField(max_length=100)
    full_name = models.CharField(max_length=100)
   
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'matric_number'
    REQUIRED_FIELDS = ['full_name', 'password', 'geder']

    def __str__(self):
        return self.matric_number

class UserProfile(models.Model):
    user = models.OneToOneField(AdminAccount, on_delete=models.CASCADE)
    manager = models.ForeignKey('self', on_delete=models.CASCADE, related_name='subordinates', null=True, blank=True)
    added_by = models.ForeignKey(AdminAccount, on_delete=models.SET_NULL, related_name='added_subordinates', null=True, blank=True)

    def __str__(self):
        return self.user.username

@receiver(post_save, sender=UserProfile)
def update_added_by(sender, instance, created, **kwargs):
    if created:
        instance.added_by = instance.manager.user if instance.manager else None
        instance.save()
   
class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Book(models.Model):
    rate =  models.IntegerField()
    number_of_people_rated = models.IntegerField()
    likes = models.IntegerField()
    unlike = models.IntegerField()
    loved = models.IntegerField()
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    total_pages = models.IntegerField()
    ISBN = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField(default=0)
    image = models.ImageField(upload_to='books/')
    user = models.ForeignKey(AdminAccount, on_delete=models.CASCADE, related_name='books', null=True, blank=True)
    category =models.CharField(max_length=100)

    def __str__(self):
        return self.title

class Borrowing(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
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
