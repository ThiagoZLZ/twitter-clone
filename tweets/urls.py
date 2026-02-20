from django.urls import path
from .views import (
    TweetListCreateView, 
    TweetDetailView, 
    UserListView, 
    UserDetailView,
    FeedView,
    )

urlpatterns = [
    path('tweets/', TweetListCreateView.as_view(), name='tweet-list'),
    path('tweets/<int:pk>/', TweetDetailView.as_view(), name='tweet-detail'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('feed/', FeedView.as_view(), name='feed'),
]