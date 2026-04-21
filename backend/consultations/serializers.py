from rest_framework import serializers
from .models import Consultation
from patients.serializers import PatientSerializer
from users.serializers import UserSerializer

class ConsultationSerializer(serializers.ModelSerializer):
    patient_detail = PatientSerializer(source='patient', read_only=True)
    medecin_detail = UserSerializer(source='medecin', read_only=True)

    class Meta:
        model = Consultation
        fields = '__all__'