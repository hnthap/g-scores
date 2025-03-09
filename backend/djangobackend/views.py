import json

from django.db.models import F
from django.forms.models import model_to_dict
from django.http import HttpResponseNotFound, JsonResponse

from .models import Round, Student


subjects = [
    'toan', 'ngu_van', 'ngoai_ngu',
    'vat_li', 'hoa_hoc', 'sinh_hoc',
    'lich_su', 'dia_li', 'gdcd',
]
subject_list_str = ', '.join(subjects)


def index(request):
    return JsonResponse({ 'message': 'Hello, this is the G-Scores server!' })


def find_by_sbd(request, sbd):
    try:
        student = Student.objects.get(sbd__exact=sbd)
        return JsonResponse(model_to_dict(student))
    except:
        return HttpResponseNotFound(
            json.dumps({ 'message': 'Fail to retrieve data.' }),
            content_type='application/json',
        )


def make_report(request, subject):
    if subject not in subjects:
        return HttpResponseNotFound(
            json.dumps({
                'message': (
                    'Subject is not found: "%s." ' +
                    'Subject must be one of %s.'
                ) % (subject, subject_list_str),
            }),
            content_type='application/json',
        )
    students = Student.objects.filter(**{ subject + '__isnull': False })
    return JsonResponse({
        '1': students.filter(**{ subject + '__gt': 7.99 }).count(),
        '2': students.filter(**{ subject + '__gt': 5.99,
                                 subject + '__lt': 8.0 }).count(),
        '3': students.filter(**{ subject + '__gt': 3.99,
                                 subject + '__lt': 6.0 }).count(),
        '4': students.filter(**{ subject + '__lt': 4.0 }).count(),
    })


def list_top_students_group_a(request):
    students = (
        Student.objects
        .filter(
            toan__isnull=False,
            vat_li__isnull=False,
            hoa_hoc__isnull=False,
        )
        .annotate(group_score=Round(F('toan') + F('vat_li') + F('hoa_hoc')))
        .order_by('-group_score')[:10]
    )
    return JsonResponse({ 'students': list(map(model_to_dict, list(students))) })
