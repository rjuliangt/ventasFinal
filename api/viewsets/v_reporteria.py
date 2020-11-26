from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status, filters
from rest_framework.viewsets import GenericViewSet
from django_filters.rest_framework import DjangoFilterBackend

from django.db.models import Count, When, Sum, Q

# Importacion de los modelos a usar en el reporte
from api.models import Producto

# importacion de serializer
from api.serializers import ProductoReadSerializer

#creacion de los viewset 
class ReporteriaViewSet(GenericViewSet):
    queryset = Producto.objects.filter(activo=True)
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre", "vendedor__first_name", "nombre")
    search_fields = ("nombre", "vendedor__first_name", "nombre")
    ordering_fields = ("creado")

    @action(methods=["get"], detail=False)
    def catalogo(self, request, *args, **kwargs):
        datos_productos = Producto.objects.filter(activo=True)
        serializer = ProductoReadSerializer(datos_productos, many=True)
        return Response({'results': serializer.data}, status=status.HTTP_200_OK)
