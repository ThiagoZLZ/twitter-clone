# “Transforme todos os campos do Tweet em JSON.”
from rest_framework import serializers
from .models import Tweet


class TweetSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = Tweet
        fields = ['id', 'author', 'content', 'created_at']
        read_only_fields = ['author']