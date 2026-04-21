from django.db import models
from patients.models import Patient

class DossierMedical(models.Model):
    patient = models.OneToOneField(Patient, on_delete=models.CASCADE, related_name='dossier')
    historique = models.TextField(blank=True, null=True)  # historique médical
    allergies = models.TextField(blank=True, null=True)
    traitements_en_cours = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return f"Dossier de {self.patient}"

    def mettre_a_jour(self, contenu):
        self.historique = contenu
        self.save()