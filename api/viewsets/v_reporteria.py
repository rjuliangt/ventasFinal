from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status, filters
from rest_framework.viewsets import GenericViewSet
from django_filters.rest_framework import DjangoFilterBackend

from django.db.models import Count, When, Sum, Q

# Importacion de los modelos a usar en el reporte
from api.models import Producto, DetalleDeVenta

# importacion de serializer
from api.serializers import ProductoReadSerializer, ReporteProductoSerializer

#creacion de los viewset 
class ReporteriaViewSet(GenericViewSet):
    queryset = Producto.objects.filter(activo=True)
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre", "vendedor__first_name")
    search_fields = ("nombre", "vendedor__first_name")
    ordering_fields = ("creado")

    @action(methods=["get"], detail=False)
    def ventasPorProducto(self, request, *args, **kwargs):
        usuario = request.user.id

        datos_productos = DetalleDeVenta.objects.filter(
                                            activo=True,
                                            producto__vendedor=usuario
                                            ).aggregate(
                                                    cantidad_vendido=Sum('cantidad'),
                                                    total_ganado=Sum('subtotal'),
                                                ).values()
        # .values('producto__nombre','producto__precio_venta',
        #                                                 'producto__descripcion', 'producto__existensia',
        #                                                 'cantidad_vendido', 'total_ganado'
        #                                                 )
        print('consulta: ',datos_productos)
        serializer = ReporteProductoSerializer(datos_productos, many=True)
        return Response({'results': serializer.data}, status=status.HTTP_200_OK)
