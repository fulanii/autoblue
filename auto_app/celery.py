import os
from celery import Celery
from autoblue_django.utils import get_env_variable

# Retrieve environment variables
REDIS_HOST = get_env_variable("REDIS_HOST") 
BROKER_URL = f"redis://{REDIS_HOST}:6379/0"

# Initialize Celery
app = Celery("auto_app")
app.conf.update(
    broker_url=BROKER_URL,
    accept_content=["json"],
    task_serializer="json",
    broker_connection_retry_on_startup=True,
    # result_backend="django-db",
)

# Load additional configuration from Django settings
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f"Request: {self.request!r}")
