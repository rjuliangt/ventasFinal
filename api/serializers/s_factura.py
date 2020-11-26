from rest_framework import serializers
from api.models import Factura


class FacturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Factura
        fields = '__all__'


class FacturaCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Factura
        fields = (
            'fecha',
            'total',
            'vendedor',
            'comprador',
        )


class FacturaReadSerializer(serializers.ModelSerializer):
    comprador = serializers.SerializerMethodField("getComprador")
    class Meta:
        model = Factura
        fields = (
            'fecha',
            'total',
            'comprador',
        )

    def getComprador(self, obj):
        if(obj.comprador is not None):
            return {'nombre': obj.comprador.first_name + " " + obj.comprador.last_name,
                        'id': obj.comprador.id
                    }
        return None
