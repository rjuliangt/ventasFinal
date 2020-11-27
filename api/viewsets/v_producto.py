from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from api.models import Producto
from django.contrib.auth.models import User

from api.serializers import ProductoCreateSerializer, ProductoReadSerializer, ProductoSerializer


class ProductoViewset(viewsets.ModelViewSet):
    queryset = Producto.objects.filter(activo=True)
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre", "descripcion", "vendedor__first_name")
    search_fields = ("nombre", "descripcion", "vendedor__first_name")
    ordering_fields = ("creado")
    
    def get_queryset(self):
        if self.request.user and self.action == 'list':
            return Producto.objects.filter(activo=True, vendedor__id=self.request.user.id)
        else:
            return Producto.objects.filter(activo=True)

    def get_serializer_class(self):
        """Definiendo serializer para API"""
        if self.action == 'list' or self.action == 'retrieve':
            return ProductoReadSerializer
        else:
            return ProductoSerializer

    def create(self, request, *args, **kwargs):
        usuario = request.user
        datos_producto = request.data
        vendedor = User.objects.get(pk=usuario.pk)
        # datos_producto['vendedor'] = usuario
        print('dataDatos', datos_producto)
        intancia = Producto.objects.get_or_create(
                            activo=True,
                            vendedor=vendedor,
                            precio_venta=datos_producto['precio_venta'],
                            precio_compra=datos_producto['precio_compra'],
                            descripcion= datos_producto['descripcion'],
                            existencia=datos_producto['existencia'],
                            nombre=datos_producto['nombre']
                        )
        serializer = ProductoReadSerializer(data=intancia)
        serializer.is_valid()
        if (intancia):
            print('es valido')
            return Response({'results': serializer.data}, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        datos_producto = request.data
        print('dataDatos', datos_producto)

        instancia = Producto.objects.get(pk=datos_producto['id'])
        instancia.activo = datos_producto['activo']
        instancia.precio_venta=datos_producto['precio_venta']
        instancia.precio_compra=datos_producto['precio_compra']
        instancia.descripcion= datos_producto['descripcion']
        instancia.existencia=datos_producto['existencia']
        instancia.nombre=datos_producto['nombre']
        instancia.save()
        serializer = ProductoReadSerializer(data=instancia)
        serializer.is_valid()
        if (instancia):
            return Response({'results': serializer.data}, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False)
    def productoCliente(self, request, *args, **kwargs):
        data = request.user
        idVendedor = data.id
        queryset = Producto.objects.filter(activo=True, vendedor=idVendedor)
        filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
        filter_fields = ("nombre", "descripcion", "vendedor__first_name")
        search_fields = ("nombre", "descripcion", "vendedor__first_name")
        ordering_fields = ("creado")
        # ProductoReadSerializer
        print('usuario', data)
        serializer = ProductoReadSerializer(data=queryset, many=True)
        serializer.is_valid()
        return Response({'results': serializer.data}, status=status.HTTP_200_OK)
