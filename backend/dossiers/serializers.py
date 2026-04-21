from rest_framework import serializers
from .models import DossierMedical

class DossierMedicalSerializer(serializers.ModelSerializer):
    class Meta:
        model = DossierMedical
        fields = '__all__'