# Generated by Django 5.0.7 on 2024-08-25 20:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('src', '0005_event_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='order',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]