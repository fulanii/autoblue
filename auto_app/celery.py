from celery import Celery
from autoblue_django.utils import get_env_variable

redis_host = get_env_variable("REDIS_HOST")

app = Celery('auto_app')
app.conf.broker_url = f'redis://{redis_host}:6379/0'
app.conf.broker_connection_retry_on_startup = True
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks() 