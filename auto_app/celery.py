import os
from celery import Celery
from autoblue_django.utils import get_env_variable

# Retrieve Redis host from the environment variable
redis_host = get_env_variable("REDIS_HOST")

app = Celery("auto_app")
app.conf.broker_url = f"redis://{redis_host}:6379/0"
app.conf.broker_connection_retry_on_startup = True

# Load configuration from Django settings
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f"Request: {self.request!r}")