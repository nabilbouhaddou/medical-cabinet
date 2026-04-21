from django.db import models
from consultations.models import Consultation

class Paiement(models.Model):
    METHODE_CHOICES = (
        ('cash', 'Cash'),
        ('carte', 'Carte bancaire'),
        ('virement', 'Virement'),
        ('assurance', 'Assurance'),
    )
    STATUT_CHOICES = (
        ('paye', 'Payé'),
        ('en_attente', 'En attente'),
        ('rembourse', 'Remboursé'),
    )

    consultation = models.OneToOneField(Consultation, on_delete=models.CASCADE, related_name='paiement')
    montant = models.DecimalField(max_digits=10, decimal_places=2)
    date_paiement = models.DateField(auto_now_add=True)
    methode = models.CharField(max_length=50, choices=METHODE_CHOICES, default='cash')
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='en_attente')
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.montant} DH - {self.consultation}"