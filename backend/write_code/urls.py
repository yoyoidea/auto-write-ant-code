from django.urls import path

from . import views

urlpatterns = [
    path('list', views.ListView.as_view(), name='list'),
    path('detail', views.DetailView.as_view(), name='detail'),
]