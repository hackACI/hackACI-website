# Generated by Django 5.0.7 on 2024-08-25 00:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('src', '0003_user'),
    ]

    operations = [
        migrations.DeleteModel(
            name='User',
        ),
    ]