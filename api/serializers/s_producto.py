from rest_framework import serializers
from api.models import Producto


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
