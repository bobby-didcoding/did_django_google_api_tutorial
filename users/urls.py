from django.urls import path
from . import views


app_name = "users"
urlpatterns = [
	
	path('', views.AccountView.as_view(), name="account"),
	path('profile', views.profile_view, name="profile"),
	path('sign-up', views.SignUpView.as_view(), name="sign-up"),
	path('sign-in', views.SignInView.as_view(), name="sign-in"),
	path('sign-out', views.sign_out, name="sign-out"),
	]