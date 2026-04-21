from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Medecin
from .serializers import MedecinSerializer

class MedecinViewSet(ModelViewSet):
    queryset = Medecin.objects.all()
    serializer_class = MedecinSerializer
    permission_classes = [IsAuthenticated]