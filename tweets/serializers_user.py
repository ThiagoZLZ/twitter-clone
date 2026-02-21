from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Tweet


class TweetMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = ['id', 'content', 'created_at']


class BaseUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


class MeSerializer(BaseUserSerializer):
    pass


class UserSerializer(BaseUserSerializer):
    tweets = TweetMiniSerializer(source='tweet_set', many=True, read_only=True)

    class Meta(BaseUserSerializer.Meta):
        fields = BaseUserSerializer.Meta.fields + ["tweets"]