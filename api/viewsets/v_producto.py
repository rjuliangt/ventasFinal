from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from api.models import Producto
from api.serializers import ProductoCreateSerializer, ProductoReadSerializer, ProductoSerializer

class ProductoViewset(viewsets.ModelViewSet):
    queryset = Producto.objects.filter(activo=True)
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre", "descripcion", "vendedor__first_name")
    search_fields = ("nombre", "descripcion", "vendedor__first_name")
    ordering_fields = ("creado")

    def get_serializer_class(self):
        """Definiendo serializer para API"""
        if self.action == 'list' or self.action == 'retrieve':
            return ProductoReadSerializer
        else:
            return ProductoSerializer

    @action(methods=['get'], detail=False)
    def productoCliente(self, request, *args, **kwargs):
        data = request.user
        print('usuario', data)
        idVendedor = data.id
        query = Producto.objects.filter(activo=True, vendedor=idVendedor)
        serializer = ProductoReadSerializer(data=query, many=True)
        return Response({'results': serializer.data}, status=status.HTTP_200_OK)
