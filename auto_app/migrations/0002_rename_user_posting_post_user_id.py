# Generated by Django 5.1.3 on 2024-12-10 00:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("auto_app", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="post",
            old_name="user_posting",
            new_name="user_id",
        ),
    ]
