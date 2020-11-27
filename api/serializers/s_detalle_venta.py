from rest_framework import serializers
from api.models import DetalleDeVenta


class DetalleDeVentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleDeVenta
        fields = '__all__'


class DetalleDeVentaCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleDeVenta
        fields = (
            'producto',
            'factura',
            'subtotal',
            'cantidad'
        )


class DetalleDeVentaReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleDeVenta
        fields = (
            'id',
            'producto',
            'factura',
            'subtotal',
            'cantidad'
        )
