import json

from django.http import JsonResponse
from django.views import View

from write_code.services import write_list_page


class ListView(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        return JsonResponse(write_list_page(data))