from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from api.models import Cliente
from api.serializers import ClienteSerializer, ClienteCrearSerializer


class ClienteViewset(viewsets.ModelViewSet):
    queryset = Cliente.objects.filter(is_active=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("last_name", "first_name")
    search_fields = ("last_name", "first_name")
    ordering_fields = ("last_name", "first_name")
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return ClienteSerializer
        else:
            return ClienteCrearSerializer
