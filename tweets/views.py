from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Tweet, Like, Follow
from .serializers import TweetSerializer
from .permissions import IsAuthorOrReadOnly
from django.contrib.auth.models import User
from .serializers_user import UserSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


# LISTAR E CRIAR TWEETS
class TweetListCreateView(generics.ListCreateAPIView):
    queryset = Tweet.objects.select_related('author').all().order_by('-created_at')
    serializer_class = TweetSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


# VER, EDITAR E DELETAR UM TWEET
class TweetDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tweet.objects.select_related('author').all()
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

# SISTEMA DE LIKES
class ToggleLikeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        tweet = Tweet.objects.get(pk=pk)
        user = request.user

        like, created = Like.objects.get_or_create(
            user=user,
            tweet=tweet
        )

        if not created:
            like.delete()
            return Response({"message": "Unliked"}, status=status.HTTP_200_OK)

        return Response({"message": "Liked"}, status=status.HTTP_201_CREATED)
    
# USUÁRIO LOGADO (ME)
class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
# SISTEMA DE FOLLOW / UNFOLLOW
class ToggleFollowView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        current_user = request.user

        try:
            user_to_follow = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(
                {"error": "Usuário não encontrado"},
                status=status.HTTP_404_NOT_FOUND
            )

        # impedir seguir a si mesmo
        if current_user == user_to_follow:
            return Response(
                {"error": "Você não pode seguir a si mesmo"},
                status=status.HTTP_400_BAD_REQUEST
            )

        follow, created = Follow.objects.get_or_create(
            follower=current_user,
            following=user_to_follow
        )

        if not created:
            follow.delete()
            return Response({"message": "Unfollowed"}, status=status.HTTP_200_OK)

        return Response({"message": "Followed"}, status=status.HTTP_201_CREATED)
