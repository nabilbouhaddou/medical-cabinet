from django.db import models
from patients.models import Patient
from users.models import User

class Consultation(models.Model):
    STATUT_CHOICES = (
        ('planifie', 'Planifié'),
        ('en_cours', 'En cours'),
        ('termine', 'Terminé'),
        ('annule', 'Annulé'),
    )

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='consultations')
    medecin = models.ForeignKey(User, on_delete=models.CASCADE, related_name='consultations')
    date_rendezvous = models.DateTimeField()
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='planifie')
    diagnostic = models.TextField(blank=True, null=True)
    observation = models.TextField(blank=True, null=True)
    ordonnance = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        ordering = ['-date_rendezvous']

    def __str__(self):
        return f"{self.patient} - {self.date_rendezvous.strftime('%d/%m/%Y %H:%M')}"