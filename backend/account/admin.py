from django.contrib import admin
from account.models import Attendance, Employee, Department, Project, Employee, Task, Salary

# Register your models here.


class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name',)
    list_filter = ('name',)
    search_fields = ('name', 'id',)


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'manager')
    list_filter = ('name',)
    search_fields = ('name', 'id',)


class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'first_name', 'last_name', 'gender', 'city',
                    'country', 'phone', 'degree', 'role', 'department', 'image', 'document', 'created_at', 'password', 'date_of_birth')
    list_filter = ('first_name',)
    search_fields = ('first_name', 'id',)
    ordering = ('email', 'id',)
    filter_horizontal = ()

    add_fieldset = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'id', 'date_of_birth', 'first_name', 'role', 'created_at',  'last_name', 'document', 'gender', 'phone', 'address', 'password1', 'password2', 'image', 'degree', 'country', 'city'),
        }),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'role', 'date_of_birth', 'last_name', 'created_at', 'gender', 'document', 'phone', 'address', 'password1', 'password2', 'image', 'degree', 'country', 'city'),
        }),
    )


class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'add', 'status',)
    list_filter = ('id',)
    search_fields = ('id',)


class SalaryAdmin(admin.ModelAdmin):
    list_display = ('id', 'amount', 'allowance', 'medical')
    list_filter = ('id',)


class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('id', 'employee', 'timestamp', )
    list_filter = ('id',)


admin.site.register(Department, DepartmentAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Employee, EmployeeAdmin)
admin.site.register(Task, TaskAdmin)
admin.site.register(Salary, SalaryAdmin)
admin.site.register(Attendance, AttendanceAdmin)
