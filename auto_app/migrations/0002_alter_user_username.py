# Generated by Django 5.1.3 on 2024-11-27 07:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("auto_app", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="username",
            field=models.CharField(max_length=12, unique=True),
        ),
    ]
