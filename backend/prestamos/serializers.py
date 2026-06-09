from rest_framework import serializers
from .models import Equipo, Persona, Prestamo


class EquipoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Equipo
        fields = '__all__'


class PersonaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Persona
        fields = '__all__'


class PrestamoSerializer(serializers.ModelSerializer):

    equipo_nombre = serializers.CharField(
        source='equipo.nombre',
        read_only=True
    )

    persona_nombre = serializers.CharField(
        source='persona.nombre',
        read_only=True
    )

    class Meta:
        model = Prestamo
        fields = '__all__'