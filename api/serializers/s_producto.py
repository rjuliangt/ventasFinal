from rest_framework import serializers
from api.models import Producto, DetalleDeVenta


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'


class ProductoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = (
            'nombre',
            'descripcion',
            'precio_compra',
            'precio_venta',
            'vendedor',
            'existencia',
            'activo'
        )


class ProductoReadSerializer(serializers.ModelSerializer):
    vendedor = serializers.SerializerMethodField("getDatosVendedor")

    class Meta:
        model = Producto
        fields = (
            'id',
            'nombre',
            'descripcion',
            'precio_compra',
            'precio_venta',
            'vendedor',
            'existencia'
        )

    def getDatosVendedor(self, obj):
        if(obj.vendedor is not None):
            return {'nombre': obj.vendedor.first_name + " " + obj.vendedor.last_name,
                        'id': obj.vendedor.id
                    }
        return None


class ReporteProductoSerializer(serializers.ModelSerializer):
    cantidad_vendido = serializers.IntegerField(default=0)
    total_ganado = serializers.DecimalField(max_digits=5,decimal_places=2,default=0)

    class Meta:
        model = DetalleDeVenta
        fields = (
            'producto__id',
            'producto__nombre',
            'producto__descripcion',
            'cantidad_vendido',
            'producto__precio_venta',
            'producto__existencia',
            'total_ganado'
        )
