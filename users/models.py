from django.db import models
from django.contrib.auth.models import User



class UserProfile(models.Model):
	'''
	Our UserProfile model extends the built-in Django User Model
	'''
	timestamp = models.DateTimeField(auto_now_add=True)
	updated = models.DateTimeField(auto_now=True)
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	
	address = models.CharField(verbose_name="Address",max_length=100, null=True, blank=True)
	town = models.CharField(verbose_name="Town/City",max_length=100, null=True, blank=True)
	county = models.CharField(verbose_name="County",max_length=100, null=True, blank=True)
	post_code = models.CharField(verbose_name="Post Code",max_length=8, null=True, blank=True)
	country = models.CharField(verbose_name="Country",max_length=100, null=True, blank=True)
	longitude = models.CharField(verbose_name="Longitude",max_length=50, null=True, blank=True)
	latitude = models.CharField(verbose_name="Latitude",max_length=50, null=True, blank=True)

	captcha_score = models.FloatField(default = 0.0)
	has_profile = models.BooleanField(default = False)
	
	is_active = models.BooleanField(default = True)

	def __str__(self):
		return f'{self.user}'