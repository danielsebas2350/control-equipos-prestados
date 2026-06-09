from django.db import models


class Equipo(models.Model):

    ESTADOS = (
        ('Disponible','Disponible'),
        ('Prestado','Prestado'),
        ('Mantenimiento','Mantenimiento')
    )

    codigo = models.CharField(max_length=20)
    nombre = models.CharField(max_length=100)
    marca = models.CharField(max_length=50)
    modelo = models.CharField(max_length=50)

    estado = models.CharField(
        max_length=20,
        choices=ESTADOS,
        default='Disponible'
    )

    def __str__(self):
        return self.nombre


class Persona(models.Model):

    TIPOS = (
        ('Docente','Docente'),
        ('Estudiante','Estudiante'),
        ('Administrativo','Administrativo')
    )

    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)

    tipo = models.CharField(
        max_length=30,
        choices=TIPOS
    )

    telefono = models.CharField(max_length=20)

    correo = models.EmailField()

    def __str__(self):
        return f"{self.nombre} {self.apellido}"


class Prestamo(models.Model):

    ESTADOS = (
        ('Prestado','Prestado'),
        ('Devuelto','Devuelto')
    )

    fecha_prestamo = models.DateField()

    fecha_devolucion = models.DateField(
        null=True,
        blank=True
    )

    equipo = models.ForeignKey(
        Equipo,
        on_delete=models.CASCADE
    )

    persona = models.ForeignKey(
        Persona,
        on_delete=models.CASCADE
    )

    estado = models.CharField(
        max_length=20,
        choices=ESTADOS,
        default='Prestado'
    )

    def __str__(self):
        return f"{self.persona} - {self.equipo}"