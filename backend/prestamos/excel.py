from openpyxl import Workbook

from django.http import HttpResponse

from .models import Prestamo


def exportar_excel(request):

    wb = Workbook()

    ws = wb.active

    ws.title = "Prestamos"

    ws.append([
        "ID",
        "Persona",
        "Equipo",
        "Fecha Prestamo",
        "Estado"
    ])

    prestamos = Prestamo.objects.all()

    for p in prestamos:

        ws.append([
            p.id,
            str(p.persona),
            str(p.equipo),
            str(p.fecha_prestamo),
            p.estado
        ])

    response = HttpResponse(
        content_type='application/ms-excel'
    )

    response[
        'Content-Disposition'
    ] = 'attachment; filename=prestamos.xlsx'

    wb.save(response)

    return response