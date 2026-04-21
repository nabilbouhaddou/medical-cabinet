from django.db import models
from users.models import User

class Patient(models.Model):
    SEXE_CHOICES = (
        ('M', 'Masculin'),
        ('F', 'Féminin'),
    )
    GROUPE_SANGUIN_CHOICES = (
        ('A+', 'A+'), ('A-', 'A-'),
        ('B+', 'B+'), ('B-', 'B-'),
        ('AB+', 'AB+'), ('AB-', 'AB-'),
        ('O+', 'O+'), ('O-', 'O-'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='patient_profile')
    telephone = models.CharField(max_length=20)
    date_naissance = models.DateField()
    adresse = models.TextField()
    sexe = models.CharField(max_length=1, choices=SEXE_CHOICES, blank=True, null=True)
    groupe_sanguin = models.CharField(max_length=3, choices=GROUPE_SANGUIN_CHOICES, blank=True, null=True)
    antecedents = models.TextField(blank=True, null=True)  # antécédents médicaux

    def __str__(self):
        return f"{self.user.get_full_name()}"

    def age(self):
        from datetime import date
        return date.today().year - self.date_naissance.year