from django.urls import path
from account.views import AttendanceListView, GetUserRole, EmployeeProfileView, EmployeeLoginView, EmployeeAPI, ProjectAPI, RecognizeFaceView, SalaryAPI, DepartmentAPI, TaskAPI, get_employee_id
urlpatterns = [
    path('login/', EmployeeLoginView.as_view(), name='login'),
    path('profile/', EmployeeProfileView.as_view(), name='profile'),
    path('get-role/', GetUserRole.as_view(), name='get-role'),
    path('dep/', DepartmentAPI.as_view(), name='department'),
    path('dep/<int:pk>/', DepartmentAPI.as_view(), name='department'),
    path('project/', ProjectAPI.as_view(), name='project'),
    path('project/<int:pk>/', ProjectAPI.as_view(), name='project'),
    path('emp/', EmployeeAPI.as_view(), name='employee'),
    path('emp/<int:pk>/', EmployeeAPI.as_view(), name='employee'),
    path('task/', TaskAPI.as_view(), name='task'),
    path('task/<int:pk>/', TaskAPI.as_view(), name='task'),
    path('salary/', SalaryAPI.as_view(), name='salary'),
    path('salary/<int:pk>/', SalaryAPI.as_view(), name='salary'),
    path('attendance/', RecognizeFaceView.as_view(),
         name='mark_attendance'),
    path('get_employee_id/<str:employee_username>/',
         get_employee_id, name='get_employee_id'),

    path('attendance_list/', AttendanceListView.as_view(), name='attendance-list'),



]
