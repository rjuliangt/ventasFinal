from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status, filters
from rest_framework.viewsets import GenericViewSet
from django_filters.rest_framework import DjangoFilterBackend

from django.db.models import Count, When, Sum, Q, Avg

# Importacion de los modelos a usar en el reporte
from api.models import Producto, DetalleDeVenta, Factura

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
        print('USUARIO: ', usuario)

        producto_usuario = Producto.objects.filter(activo=True, vendedor=usuario)
        reporte = []
        for mi_producto in producto_usuario:
            datos_productos = DetalleDeVenta.objects.filter(
                                                activo=True,
                                                producto__id=mi_producto.pk
                                                ).aggregate(
                                                        cantidad_vendido=Sum('cantidad'),
                                                        total_ganado=Sum('subtotal'),
                                                    )
            datos_productos['nombre'] = mi_producto.nombre
            datos_productos['id_producto'] = mi_producto.pk
            datos_productos['descripcion'] = mi_producto.descripcion
            datos_productos['existencia'] = mi_producto.existencia
            reporte.append(datos_productos)
        print('consulta: ',reporte)
        return Response({'results': reporte}, status=status.HTTP_200_OK)


    @action(methods=["get"], detail=False)
    def ventasGlobal(self, request, *args, **kwargs):
        usuario = request.user.id
        print('USUARIO: ', usuario)

        reporte = Producto.objects.filter(
                                            activo=True,
                                            vendedor=usuario,
                                        ).aggregate(
                                                    novendido=Sum('existencia'),
                                                    vendidos=Sum('producto_detalle__cantidad'),
                                                    ganado=Sum('producto_detalle__subtotal'),
                                                )
        print('consulta: ',reporte)
        return Response({'results': reporte}, status=status.HTTP_200_OK)
    

    @action(methods=["get"], detail=False)
    def precioPromedio(self, request, *args, **kwargs):
        usuario = request.user.id
        print('USUARIO: ', usuario)
        reporte = Producto.objects.filter(
                                            activo=True,
                                            vendedor=usuario,
                                        ).aggregate(
                                                    promedio=Avg('precio_venta'),
                                                    noproductos=Count('nombre')
                                                )
        print('consulta: ',reporte)
        return Response({'results': reporte}, status=status.HTTP_200_OK)
