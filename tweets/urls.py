from django.urls import path
from .views import TweetListCreateView

urlpatterns = [
    path('tweets/', TweetListCreateView.as_view(), name='tweet-list'),
]