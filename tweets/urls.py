from django.urls import path
from .views import (
    TweetListCreateView, 
    TweetDetailView, 
    UserListView, 
    UserDetailView,
    FeedView,
    ToggleLikeView,
    MeView,
    ToggleFollowView,
    )

urlpatterns = [
    path('tweets/', TweetListCreateView.as_view(), name='tweet-list'),
    path('tweets/<int:pk>/', TweetDetailView.as_view(), name='tweet-detail'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('feed/', FeedView.as_view(), name='feed'),
    path('tweets/<int:pk>/like/', ToggleLikeView.as_view(), name='tweet-like'),
    path('me/', MeView.as_view(), name='me'),
    path("users/<int:user_id>/follow/", ToggleFollowView.as_view()),
]
