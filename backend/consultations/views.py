from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Consultation
from .serializers import ConsultationSerializer

class ConsultationViewSet(ModelViewSet):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def aujourd_hui(self, request):
        from django.utils import timezone
        today = timezone.now().date()
        consultations = Consultation.objects.filter(date_rendezvous__date=today)
        serializer = ConsultationSerializer(consultations, many=True)
        return Response(serializer.data)