from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_GET, require_POST
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from .models import UserProfile
import json

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


def user_logout(request):
    logout(request)
    return redirect('login_view') 


@login_required(login_url="/login/")
def dashboard(request):
    user = request.user
    current_user_profile = UserProfile.objects.filter(user_id=user.id).first()

    context = {
        "bluesky_profile": current_user_profile
    }

    return render(request, "auto_app/dashboard.html", context=context)


@require_POST
@login_required
def password_change(request):
    cur_pass = request.POST.get("cur-pass")
    new_pass = request.POST.get("new-pass")

    user = request.user  # Get the currently logged-in user

    if user.check_password(cur_pass):  # Check if the provided current password is correct
        user.set_password(new_pass)  # Change the user's password
        user.save()  # Save changes to the database
        return JsonResponse({"success": True, "message": "Password changed successfully"})
    else:
        return JsonResponse({"success": False, "message": "Current password is incorrect"})
    
@require_GET
@login_required
def delete_account(request):
    try:
        # Delete the associated UserProfile if it exists
        UserProfile.objects.filter(user=request.user).delete()
    
        # Delete the User account
        User.objects.filter(id=request.user.id).delete()

        # Log out the user and redirect to the home page
        return JsonResponse({"success": True, "message": "Account deleted successfully", "redirect": "/"})
    except:
        return JsonResponse({"success": False, "message": "Invalid request method"}, status=405)



@require_POST
@login_required
def add_blue_login(request):
    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return JsonResponse({"success": False, "message": "Both username and password are required."}, status=400)

        # Update or create UserProfile entry
        profile, created = UserProfile.objects.update_or_create(
            user=request.user,
            defaults={
                'bluesky_username': username,
                'bluesky_password': password  #  password encryption  handled in model
            }
        )

        return JsonResponse({"success": True, "message": "Saved Bluesky logins successfully."})
    except Exception as e:
        return JsonResponse({"success": False, "message": str(e)}, status=500)
    

@require_POST
@login_required
def update_blue_login(request):
    try:
        data = json.loads(request.body)
        new_username = data.get('newUsername')
        new_password = data.get('newPassword')

        if not new_username or not new_password:
            return JsonResponse({"success": False, "message": "Both username and password are required."}, status=400)

        # Get or create the user profile
        profile, created = UserProfile.objects.get_or_create(user=request.user)
        profile.bluesky_username = new_username
        profile.bluesky_password = new_password
        profile.save()

        return JsonResponse({"success": True, "message": "Bluesky logins updated successfully."})
    except Exception as e:
        return JsonResponse({"success": False, "message": f"Error: {str(e)}"}, status=500)
