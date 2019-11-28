import requests
import json
from rest_framework import status

def make_request(url='', method='get', data=None, headers=None):
    res = requests.request(
        method=method,
        url=url,
        json=data or {},
        headers=headers,
    )

    res.raise_for_status()

    if res.status_code == status.HTTP_204_NO_CONTENT:
        return None
    return json.loads(res.content.decode('utf-8'))