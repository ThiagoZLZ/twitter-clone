from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Tweet
from .serializers import TweetSerializer
from .permissions import IsAuthorOrReadOnly
from django.contrib.auth.models import User
from .serializers_user import UserSerializer


# LISTAR E CRIAR TWEETS
class TweetListCreateView(generics.ListCreateAPIView):
    queryset = Tweet.objects.all().order_by('-created_at')
    serializer_class = TweetSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


# VER, EDITAR E DELETAR UM TWEET
class TweetDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

# LISTAR USUÁRIOS
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# PERFIL DE UM USUÁRIO
class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# FEED GLOBAL (timeline)
class FeedView(generics.ListAPIView):
    queryset = Tweet.objects.all().order_by('-created_at')
    serializer_class = TweetSerializer
