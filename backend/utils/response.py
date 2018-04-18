from common.const import *


def success_response_data(data):
    return {'status': SUCCESS, 'data': data}


def fail_response_data(data):
    return {'status': FAIL, 'data': data}