from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Administrateur'),
        ('medecin', 'Médecin'),
        ('secretaire', 'Secrétaire'),
        ('patient', 'Patient'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='patient')
    telephone = models.CharField(max_length=20, blank=True, null=True)
    photo = models.ImageField(upload_to='photos/', blank=True, null=True)

    def __str__(self):
        return f"{self.get_full_name()} ({self.role})"