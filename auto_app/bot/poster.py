from atproto import Client
from django.contrib.auth.models import User
from auto_app.models import UserProfile


def post_schedules(username, app_passwrod):
    """Regularly check scheduled posts db and post them"""
    # client = Client()
    # client.login(self.username, self.password)
    # post = client.send_post('Hello world! I posted this via the Python SDK.')
