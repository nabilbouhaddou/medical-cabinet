from django.contrib import admin
from .models import Consultation


@admin.register(Consultation)
class ConsultationAdmin(admin.ModelAdmin):
    list_display = ('patient', 'medecin', 'date_rendezvous', 'statut')
    list_filter = ('statut', 'date_rendezvous', 'medecin')
    search_fields = (
        'patient__user__username',
        'medecin__user__username',
        'diagnostic'
    )
    ordering = ('-date_rendezvous',)
    list_editable = ('statut',)
    readonly_fields = ('created_at', 'updated_at')
