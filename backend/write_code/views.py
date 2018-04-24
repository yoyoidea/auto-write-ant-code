import json

from django.http import JsonResponse
from django.views import View

from write_code.services import *


class ListView(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        return JsonResponse(write_list_page(data))


class DetailView(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        print(data)
        return JsonResponse(write_detail_page(data))


class AddView(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        print(data)
        return JsonResponse(write_add_page(data))