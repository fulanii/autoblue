from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("home/", views.index, name="index"),
    path("register/", views.register, name="register"),
    path("login/", views.login_view, name="login_view"),
    path("dashboard/", views.dashboard, name="dashboard"),
    path("logout/", views.user_logout, name="logout"),
    path("password_change/", views.password_change, name="password_change"),
    path("delete_account/", views.delete_account, name="delete_account"),
    path("add_blue_login/", views.add_blue_login, name="add_blue_login"),
    path("update_blue_login/", views.update_blue_login, name="update_blue_login"),
    path("save_schedules/", views.save_schedules, name="save_schedules"),
    path("cancel_post/", views.cancel_post, name="cancel_post"),
]
