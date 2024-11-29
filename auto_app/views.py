from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_GET, require_POST
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout


# Create your views here.
def index(request):
    return render(request, "auto_app/home.html")


def register(request):
    if request.method == "POST":
        data = request.POST
        username = data.get("username")
        password = data.get("password")

        if User.objects.filter(username=username).exists():
            # Username already exists, return failure
            return JsonResponse({"success": False, "message": "Username already taken"})

        # Create and save the new user
        user = User.objects.create_user(username=username, password=password)
        user.save()

        if user.pk:
            return JsonResponse({"success": True, "message": "User register successfully"})
     
    return render(request, "auto_app/register.html")

def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        stay_login = request.POST.get("stay-login") == "True"

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            
            if stay_login:
                request.session.set_expiry(60 * 60 * 24 * 30)  # 30 days
            else:
                request.session.set_expiry(0)  # Session expires on browser close
            
            next_url = request.GET.get('next', '/dashboard/')
            return JsonResponse({"success": True, "redirect_url": next_url})

        else:
            return JsonResponse({"success": False, "message": "Invalid login, try again"})

    return render(request, "auto_app/login.html")

@login_required(login_url="/login/")
def dashboard(request):
    return render(request, "auto_app/dashboard.html", {"login": True})

def user_logout(request):
    logout(request)
    return redirect('login_view') 