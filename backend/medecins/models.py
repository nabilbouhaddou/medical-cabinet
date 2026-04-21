from django.db import models
from users.models import User

class Medecin(models.Model):
    SPECIALITE_CHOICES = (
        ('generaliste', 'Médecin Généraliste'),
        ('cardiologue', 'Cardiologue'),
        ('dermatologue', 'Dermatologue'),
        ('pediatre', 'Pédiatre'),
        ('autre', 'Autre'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='medecin_profile')
    specialite = models.CharField(max_length=100, choices=SPECIALITE_CHOICES, default='generaliste')
    numero_ordre = models.CharField(max_length=50, blank=True, null=True)  # numéro d'ordre médical
    disponible = models.BooleanField(default=True)

    def __str__(self):
        return f"Dr. {self.user.get_full_name()} - {self.specialite}"