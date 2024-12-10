from celery import shared_task
from atproto import Client
from django.contrib.auth.models import User
from auto_app.models import BlueskyProfile
from .models import Post



@shared_task
def post_scheduled_content(post_id, blue_username, blue_password):
    try:
        post = Post.objects.get(id=post_id)
       
        client = Client()
        client.login(blue_username, blue_password)
        response = client.send_post(post.post) 

        post.is_posted = True
        post.save()
    except Post.DoesNotExist:
        print(f"Post with ID {post_id} does not exist.")