from celery import shared_task
# from celery.worker.control import revoke

from atproto import Client
from django.contrib.auth.models import User
from auto_app.models import BlueskyProfile, Post
from .models import Post
from .celery import app

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


def cancel_task(post_id):
    try:
        post = Post.objects.get(id=post_id)
        task_id = post.task_id

        # Revoke the Celery task
        app.control.revoke(task_id=task_id, terminate=True)  

        # Delete the post from the database
        post.delete()
        return {"status": "success", "message": "Post canceled and deleted successfully."}
    except Post.DoesNotExist:
        return {"status": "error", "message": "Post not found."}
    except Exception as error:
        print( str(error))
        return {"status": "error", "message": "Something went wrong try again later."}