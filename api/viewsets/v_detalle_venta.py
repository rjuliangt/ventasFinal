from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets

from api.models import DetalleDeVenta
from api.serializers import DetalleDeVentaCreateSerializer, DetalleDeVentaReadSerializer, DetalleDeVentaSerializer

class DetalleDeVentaViewset(viewsets.ModelViewSet):
    queryset = DetalleDeVenta.objects.filter(activo=True)
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("producto", "subtotal")
    search_fields = ("producto", "subtotal")
    ordering_fields = ("producto")

    def get_serializer_class(self):
        """Definiendo serializer para API"""
        if self.action == 'list' or self.action == 'retrieve':
            return DetalleDeVentaReadSerializer
        else:
            return DetalleDeVentaSerializer