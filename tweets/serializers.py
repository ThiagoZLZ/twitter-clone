# “Transforme todos os campos do Tweet em JSON.”
from rest_framework import serializers
from .models import Tweet
from .models import Like


class TweetSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.username', read_only=True)
    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Tweet
        fields = ['id', 'author', 'content', 'created_at', 'likes_count', 'is_liked']
        read_only_fields = ['author']
    
    def get_likes_count(self, obj):
        return obj.likes.count()
    
    def get_is_liked(self, obj):
        request = self.context.get("request")

        if request and request.user.is_authenticated:
            return obj.likes.filter(user=request.user).exists()

        return False

class LikeSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Like
        fields = ["id", "user", "tweet", "created_at"]
        read_only_fields = ["user"]

        