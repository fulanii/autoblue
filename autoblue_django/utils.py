import os
import environ
from dotenv import load_dotenv
from django.core.exceptions import ImproperlyConfigured
from cryptography.fernet import Fernet

env = environ.Env()

# Determine environment
ENVIRONMENT = os.getenv('DJANGO_ENV')

# Load environment-specific .env file
if ENVIRONMENT == 'production':
    environ.Env.read_env('.env.prod')
elif ENVIRONMENT == "development":
    environ.Env.read_env('.env.dev')

def get_settings_path() -> str:
    """
    Gets project settings path from the .env file
    or return the default path value 'autoblue_django.settings.dev'
    """
    try:
        return env("DJANGO_SETTINGS_MODULE")
    except ImproperlyConfigured:
        return "autoblue_django.settings.dev"


def get_env_variable(var_name: str) -> str:
    """Get environment variable by its name"""
    try:
        return env(var_name)
    except:  # TO-DO: fix
        return "not found"


def generate_secret_key() -> str:
    """Generates and return key for encryption"""
    key = Fernet.generate_key()
    return key.decode()
