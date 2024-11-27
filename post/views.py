from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    return render(request, "post/home.html")

def register(request):
    return HttpResponse( "register")

def login_view(request):
    return HttpResponse( "login")