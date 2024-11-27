from django.apps import AppConfig

class AutoAppConfig(AppConfig):  # Update the class name
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'auto_app'  # Update the name to match your new app folder
