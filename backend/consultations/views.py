from django.utils import timezone
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Consultation
from .serializers import ConsultationSerializer


class ConsultationViewSet(ModelViewSet):
    serializer_class = ConsultationSerializer
    permission_classes = [IsAuthenticated]

    # 🟢 Sécurisation des données selon rôle
    def get_queryset(self):
        user = self.request.user

        # 👨‍💻 Admin voit tout
        if user.role == "admin":
            return Consultation.objects.all()

        # 👨‍⚕️ Médecin voit ses consultations
        if user.role == "medecin":
            return Consultation.objects.filter(medecin__user=user)

        # 👤 Patient voit ses consultations
        if user.role == "patient":
            return Consultation.objects.filter(patient__user=user)

        return Consultation.objects.none()

    # 🟢 Action: consultations du jour
    @action(detail=False, methods=['get'])
    def aujourd_hui(self, request):
        today = timezone.now().date()

        qs = self.get_queryset().filter(date_rendezvous__date=today)

        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    # 🟢 Action: consultations du médecin connecté
    @action(detail=False, methods=['get'])
    def mes_consultations(self, request):
        user = request.user

        if user.role != "medecin":
            return Response({"error": "Non autorisé"}, status=403)

        qs = Consultation.objects.filter(medecin__user=user)
        serializer = self.get_serializer(qs, many=True)

        return Response(serializer.data)
