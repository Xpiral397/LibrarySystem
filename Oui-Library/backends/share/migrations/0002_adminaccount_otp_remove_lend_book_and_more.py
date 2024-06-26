# Generated by Django 4.2.10 on 2024-05-02 14:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('share', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='adminaccount',
            name='otp',
            field=models.IntegerField(default=0),
        ),
        migrations.RemoveField(
            model_name='lend',
            name='book',
        ),
        migrations.RemoveField(
            model_name='reserved',
            name='book',
        ),
        migrations.RemoveField(
            model_name='useraccount',
            name='lent',
        ),
        migrations.RemoveField(
            model_name='useraccount',
            name='reserved',
        ),
        migrations.AddField(
            model_name='lend',
            name='book',
            field=models.ManyToManyField(related_name='lend_books', to='share.book'),
        ),
        migrations.AddField(
            model_name='reserved',
            name='book',
            field=models.ManyToManyField(related_name='reservation', to='share.book'),
        ),
        migrations.AddField(
            model_name='useraccount',
            name='lent',
            field=models.ManyToManyField(to='share.lend', verbose_name='balancemk'),
        ),
        migrations.AddField(
            model_name='useraccount',
            name='reserved',
            field=models.ManyToManyField(to='share.reserved', verbose_name='balancemk'),
        ),
    ]
