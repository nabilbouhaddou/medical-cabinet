from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import DossierMedical
from .serializers import DossierMedicalSerializer

class DossierMedicalViewSet(ModelViewSet):
    queryset = DossierMedical.objects.all()
    serializer_class = DossierMedicalSerializer
    permission_classes = [IsAuthenticated]