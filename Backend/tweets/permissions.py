from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAuthorOrReadOnly(BasePermission):
    """
    Permite edição apenas ao autor do tweet.
    """

    def has_object_permission(self, request, view, obj):

        # Métodos seguros (GET, HEAD, OPTIONS) são liberados
        if request.method in SAFE_METHODS:
            return True

        # Só o autor pode editar/deletar
        return obj.author == request.user