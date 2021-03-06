from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets

from api.models import Factura
from api.serializers import FacturaSerializer, FacturaReadSerializer, FacturaCreateSerializer

class FacturaViewset(viewsets.ModelViewSet):
    queryset = Factura.objects.filter(activo=True)
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("comprador__first_name", "direccion")
    search_fields = ("comprador__first_name", "direccion")
    ordering_fields = ("creado")

    def get_serializer_class(self):
        """Definiendo serializer para API"""
        if self.action == 'list' or self.action == 'retrieve':
            return FacturaReadSerializer
        else:
            return FacturaSerializer
