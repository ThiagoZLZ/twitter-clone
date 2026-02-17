from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Tweet
from .serializers import TweetSerializer


class TweetListCreateView(generics.ListCreateAPIView):
    queryset = Tweet.objects.all().order_by('-created_at')
    serializer_class = TweetSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
