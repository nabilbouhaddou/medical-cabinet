from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer, RegisterPatientSerializer

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        # Inscription patient → tout le monde
        if self.action == 'register_patient':
            return [AllowAny()]
        # Toutes les autres actions → authentifié
        return [IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        # Admin voit tout
        if user.role == 'admin':
            return User.objects.all()
        # Médecin/secrétaire voient seulement les patients
        return User.objects.filter(role='patient')

    # ✅ Inscription PATIENT uniquement
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def register_patient(self, request):
        serializer = RegisterPatientSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'message': 'Compte patient créé avec succès',
                'username': user.username
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # ✅ Création compte par ADMIN uniquement
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def create_user(self, request):
        if request.user.role != 'admin':
            return Response(
                {'error': 'Seul l\'administrateur peut créer des comptes'},
                status=status.HTTP_403_FORBIDDEN
            )
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            role = request.data.get('role')
            if role not in ['medecin', 'secretaire', 'patient']:
                return Response({'error': 'Rôle invalide'}, status=400)
            user = serializer.save()
            return Response({'message': f'Compte {role} créé avec succès'}, status=201)
        return Response(serializer.errors, status=400)

    # ✅ Mon profil
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
    