from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.http import require_GET, require_POST
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User


# Create your views here.
def index(request):
    return render(request, "post/home.html")

@csrf_exempt
@require_POST
def register(request):
    username = request.POST["username"]
    password = request.POST["password"]

    user = User.objects.create_user(username=username, password=password)
    user.save()
    if user.pk:
        # implement a redirect here
        return HttpResponse("User saved successfully ")

def login_view(request):
    all_users = User.objects.all()
    print(all_users)
    return HttpResponse( "login")