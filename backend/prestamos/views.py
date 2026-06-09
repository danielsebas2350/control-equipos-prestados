from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Equipo, Persona, Prestamo
from .serializers import *


class EquipoViewSet(viewsets.ModelViewSet):
    queryset = Equipo.objects.all()
    serializer_class = EquipoSerializer


class PersonaViewSet(viewsets.ModelViewSet):
    queryset = Persona.objects.all()
    serializer_class = PersonaSerializer


class PrestamoViewSet(viewsets.ModelViewSet):
    queryset = Prestamo.objects.all()
    serializer_class = PrestamoSerializer


@api_view(['GET'])
def dashboard(request):

    total_equipos = Equipo.objects.count()

    disponibles = Equipo.objects.filter(
        estado='Disponible'
    ).count()

    prestados = Equipo.objects.filter(
        estado='Prestado'
    ).count()

    mantenimiento = Equipo.objects.filter(
        estado='Mantenimiento'
    ).count()

    personas = Persona.objects.count()

    prestamos = Prestamo.objects.count()

    return Response({
        "total_equipos": total_equipos,
        "disponibles": disponibles,
        "prestados": prestados,
        "mantenimiento": mantenimiento,
        "personas": personas,
        "prestamos": prestamos
    })


@api_view(['GET'])
def equipos_disponibles(request):

    equipos = Equipo.objects.filter(
        estado='Disponible'
    )

    serializer = EquipoSerializer(
        equipos,
        many=True
    )

    return Response(serializer.data)


@api_view(['GET'])
def equipos_prestados(request):

    equipos = Equipo.objects.filter(
        estado='Prestado'
    )

    serializer = EquipoSerializer(
        equipos,
        many=True
    )

    return Response(serializer.data)


@api_view(['GET'])
def historial_prestamos(request):

    prestamos = Prestamo.objects.all()

    serializer = PrestamoSerializer(
        prestamos,
        many=True
    )

    return Response(serializer.data)
@api_view(['PUT'])
def devolver_equipo(request, pk):

    prestamo = Prestamo.objects.get(id=pk)

    prestamo.estado = "Devuelto"
    prestamo.save()

    equipo = prestamo.equipo

    equipo.estado = "Disponible"
    equipo.save()

    return Response({
        "mensaje": "Equipo devuelto correctamente"
    })
@api_view(['POST'])
def registrar_prestamo(request):

    equipo_id = request.data['equipo']
    persona_id = request.data['persona']

    equipo = Equipo.objects.get(id=equipo_id)

    if equipo.estado != 'Disponible':

        return Response({
            'error':'Equipo no disponible'
        })

    serializer = PrestamoSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        equipo.estado = "Prestado"
        equipo.save()

        return Response(serializer.data)

    return Response(serializer.errors)