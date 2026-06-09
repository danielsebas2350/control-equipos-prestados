from django.urls import path

from rest_framework.routers import DefaultRouter

from .views import *

from .excel import exportar_excel


router = DefaultRouter()

router.register(
    'equipos',
    EquipoViewSet
)

router.register(
    'personas',
    PersonaViewSet
)

router.register(
    'prestamos',
    PrestamoViewSet
)

urlpatterns = router.urls

urlpatterns += [

    path(
        'dashboard/',
        dashboard
    ),

    path(
        'equipos-disponibles/',
        equipos_disponibles
    ),

    path(
        'equipos-prestados/',
        equipos_prestados
    ),

    path(
        'historial/',
        historial_prestamos
    ),

    path(
        'registrar-prestamo/',
        registrar_prestamo
    ),

    path(
        'devolver/<int:pk>/',
        devolver_equipo
    ),

    path(
        'excel/',
        exportar_excel
    )
]
