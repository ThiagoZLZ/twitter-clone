from rest_framework import serializers
from .models import Tweet, Like, Follow


class TweetSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.username', read_only=True)
    author_id = serializers.IntegerField(source='author.id', read_only=True)

    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()

    class Meta:
        model = Tweet
        fields = [
            'id',
            'author',
            'author_id',
            'content',
            'created_at',
            'likes_count',
            'is_liked',
            'is_following'
        ]
        read_only_fields = ['author']

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_is_liked(self, obj):
        request = self.context.get("request")

        if request and request.user.is_authenticated:
            return obj.likes.filter(user=request.user).exists()

        return False

    def get_is_following(self, obj):
        request = self.context.get("request")

        if request and request.user.is_authenticated:
            return Follow.objects.filter(
                follower=request.user,
                following=obj.author
            ).exists()

        return False

        