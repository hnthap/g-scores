from django.db import models


class Student(models.Model):
    sbd = models.CharField(max_length=8, null=False, primary_key=True)
    toan = models.DecimalField(max_digits=4, decimal_places=2, default=None)
    ngu_van = models.DecimalField(max_digits=4, decimal_places=2, default=None)
    ngoai_ngu = models.DecimalField(max_digits=4, decimal_places=2, default=None)
    vat_li = models.DecimalField(max_digits=4, decimal_places=2, default=None)
    hoa_hoc = models.DecimalField(max_digits=4, decimal_places=2, default=None)
    sinh_hoc = models.DecimalField(max_digits=4, decimal_places=2, default=None)
    lich_su = models.DecimalField(max_digits=4, decimal_places=2, default=None)
    dia_li = models.DecimalField(max_digits=4, decimal_places=2, default=None)
    gdcd = models.DecimalField(max_digits=4, decimal_places=2, default=None)
    ma_ngoai_ngu = models.CharField(max_length=2, null=True)

    def __unicode__(self):
        return self.content


class Round(models.Func):
    function = 'ROUND'
    template = '%(function)s(%(expressions)s, 2)'
