# Generated by Django 5.0.7 on 2024-08-27 12:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('src', '0009_page'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='page',
            name='url',
        ),
        migrations.AlterField(
            model_name='page',
            name='date',
            field=models.DateTimeField(),
        ),
    ]
