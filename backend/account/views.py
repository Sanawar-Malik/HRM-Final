from datetime import timezone
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from account.serializers import AttendanceSerializer, EmployeeLoginSerializer, EmployeeProfileSerializer, DepartmentSerializer,  ProjectSerializer, EmployeeSerializer, SalarySerializer, TaskSerializer
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.exceptions import NotFound
from account.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from .models import Attendance, Department, Project, Employee, Salary, Task
from rest_framework.parsers import MultiPartParser, FormParser
from django.views.decorators.csrf import csrf_exempt
from deepface import DeepFace
import numpy as np
import datetime
from django.http import JsonResponse
from deepface import DeepFace
import tempfile
import os
import base64
from django.views import View
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.core.files.base import ContentFile
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse, HttpResponseNotAllowed
from django.views.decorators.http import require_POST
from rest_framework.decorators import permission_classes
import json
from PIL import Image
import cv2
from django.utils.timezone import now
from datetime import timedelta
#  Generate token Manually


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refreh": str(refresh),
        'access': str(refresh.access_token),
    }


# -------------------UserRegistrationView--------------------


class GetUserRole(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        role = request.user.role
        return Response({'role': role})


class DepartmentAPI(APIView):
    allowed_methods = ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None, format=None):
        id = pk
        user_id = request.user.id
        if id is not None:
            dep = Department.objects.get(id=id)
          # print(emo)
            serializer = DepartmentSerializer(dep)
            return Response(serializer.data, status=status.HTTP_200_OK)

        dep = Department.objects.filter()
      # emo = [department_manager.hod for department_manager in dep]
        serializer = DepartmentSerializer(dep, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# ---------Create Department -----------------

    def post(self, request, format=None):
        print("Request Data:", request.data)
        serializer = DepartmentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Department Create Successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_Bad_Request)


# ------------Update Department----------------


    def put(self, request, pk, format=None):
        id = pk
        dep = Department.objects.get(pk=id)
        serializer = DepartmentSerializer(dep, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Department update completely'})
        return Response(serializer.errors, status=status.HTTP_400_Bad_Request)

    def patch(self, request, pk, format=None):
        id = pk
        dep = Department.objects.get(pk=id)
        serializer = DepartmentSerializer(dep, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Partial Department update completely'})
        return Response(serializer.errors, status=status.HTTP_400_Bad_Request)
# ------------Delete Department------------------

    def delete(self, request, pk, format=None):
        id = pk
        dep = Department.objects.get(pk=id)
        serializer = DepartmentSerializer(dep, data=request.data)
        dep.delete()
        return Response({'msg': 'Department delete completely'})


class ProjectAPI(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None, format=None):
        id = pk
        if id is not None:
            project = Project.objects.get(id=id)
            serializer = ProjectSerializer(project)
            return Response(serializer.data, status=status.HTTP_200_OK)
        project = Project.objects.all()
        serializer = ProjectSerializer(project, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
# -------------Create Project-----------------------

    def post(self, request, format=None):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Project Create Successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_Bad_Request)

# --------------Update Project-----------------------
    def put(self, request, pk, format=None):
        id = pk
        project = Project.objects.get(pk=id)
        serializer = ProjectSerializer(project, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Completely data Update'})
        return Response(serializer.errors, status=status.HTTP_400_Bad_Request)

    def patch(self, request, pk, format=None):
        id = pk
        project = Project.objects.get(pk=id)
        serializer = ProjectSerializer(
            project, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Partial Data Update'})
        return Response(serializer.errors, status=status.HTTP_400_Bad_Request)
# -----------------Delete Project-----------------------

    def delete(self, request, pk, format=None):
        id = pk
        project = Project.objects.get(pk=id)
        serializer = ProjectSerializer(project, data=request.data)
        project.delete()
        return Response({'msg': 'Project Delete Completely'})


class EmployeeAPI(APIView):
    allowed_methods = ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
    renderer_classes = [UserRenderer]
    permission_classes = [AllowAny, IsAuthenticated]

    def get(self, request, pk=None, format=None):
        id = pk
        if id is not None:
            emp = Employee.objects.get(id=id)
            serializer = EmployeeSerializer(emp)
            return Response(serializer.data, status=status.HTTP_200_OK)
        emp = Employee.objects.all()
        serializer = EmployeeSerializer(emp, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
# -------------Create Employee-----------------------

    def post(self, request, format=None):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            employee = serializer.save()

            token = get_tokens_for_user(employee)
            return Response({'token': token, 'msg': 'Employee Create Successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_Bad_Request)

# --------------Update Employee---------------------------------------------
    def put(self, request, pk, format=None):
        id = pk
        emp = Employee.objects.get(pk=id)
        serializer = EmployeeSerializer(emp, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Completely data Update'})
        return Response(serializer.errors, status=status.HTTP_400_Bad_Request)

    def patch(self, request, pk, format=None):
        id = pk
        emp = Employee.objects.get(pk=id)
        serializer = EmployeeSerializer(emp, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Partial Data Update'})
        return Response(serializer.errors, status=status.HTTP_400_Bad_Request)
# -----------------Delete Employee-----------------------

    def delete(self, request, pk, format=None):
        id = pk
        emp = Employee.objects.get(pk=id)
        serializer = EmployeeSerializer(emp, data=request.data)
        emp.delete()
        return Response({'msg': 'Employee Delete Completely'})


class TaskAPI(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None, format=None):
        id = pk
        if id is not None:
            task = Task.objects.get(id=id)
            serializer = TaskSerializer(task)
            return Response(serializer.data, status=status.HTTP_200_OK)
        task = Task.objects.all()
        serializer = TaskSerializer(task, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
# -------------Create Task-----------------------

    def post(self, request, format=None):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Task Create Successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_Bad_Request)

# --------------Update Task-----------------------
    def put(self, request, pk, format=None):
        id = pk
        task = Task.objects.get(pk=id)
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Completely data Update'})
        return Response(serializer.errors, status=status.HTTP_400_Bad_Request)

    def patch(self, request, pk, formate=None):
        id = pk
        task = Task.objects.get(pk=id)
        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Partial Data Update'})
        return Response(serializer.errors, status=status.HTTP_400_Bad_Request)
# -----------------Delete Task-----------------------

    def delete(self, request, pk, formate=None):
        id = pk
        task = Task.objects.get(pk=id)
        serializer = TaskSerializer(task, data=request.data)
        task.delete()
        return Response({'msg': 'Task Delete Completely'})


class SalaryAPI(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None, formate=None):
        id = pk
        if id is not None:
            salary = Salary.objects.get(id=id)
            serializer = SalarySerializer(salary)
            return Response(serializer.data, status=status.HTTP_200_OK)
        salary = Salary.objects.all()
        serializer = SalarySerializer(salary, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
# -------------Create Salary-----------------------

    def post(self, request, formate=None):
        serializer = SalarySerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Salary Create Successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_Bad_Request)

# --------------Update Salary-----------------------
    def put(self, request, pk, formate=None):
        id = pk
        salary = Salary.objects.get(pk=id)
        serializer = SalarySerializer(salary, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Completely data Update'})
        return Response(serializer.errors, status=status.HTTP_400_Bad_Request)

    def patch(self, request, pk, formate=None):
        id = pk
        salary = Salary.objects.get(pk=id)
        serializer = SalarySerializer(salary, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Partial Data Update'})
        return Response(serializer.errors, status=status.HTTP_400_Bad_Request)
# -----------------Delete Task-----------------------

    def delete(self, request, pk, formate=None):
        id = pk
        salary = Salary.objects.get(pk=id)
        serializer = SalarySerializer(salary, data=request.data)
        salary.delete()
        return Response({'msg': 'Salary Delete Completely'})


class EmployeeLoginView(APIView):
    allowed_methods = ['POST']
    renderer_classes = [UserRenderer]

    def post(self, request, formate=None):
        serializer = EmployeeLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(email=email, password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({'token': token, 'role': user.role,  'msg': 'Login Success'}, status=status.HTTP_200_OK)
            else:
                return Response({'errors': {'non_field_errors': ['Email and Password not Valid']}}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_401_Bad_Request)


class EmployeeProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, formate=None):
        serializer = EmployeeProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


os.environ['CUDA_VISIBLE_DEVICES'] = '-1'
class RecognizeFaceView(APIView):
    @staticmethod
    def recognize_employee(uploaded_image_array):
        try:
            employees = Employee.objects.all()
            uploaded_image_array = cv2.resize(uploaded_image_array, (160, 160))
            for employee in employees:
                employee_image = cv2.imread(employee.image.path)
                if employee_image is None:
                    continue
                employee_image = cv2.resize(employee_image, (160, 160))


                result = DeepFace.verify(
                    img1_path=uploaded_image_array,
                    img2_path=employee_image,
                    model_name='Facenet',  # or 'SFace'
                    enforce_detection=False,
                    detector_backend='opencv'  # Fast and simple backend
                )

                print("result", result)
                if result['verified']:
                    print("ok")
                    return employee
            return None
        except Exception:
            return None
    

    @staticmethod
    def mark_attendance(employee):
        print(f"[DEBUG] Trying to mark attendance for: {employee}")

        recent_attendance = Attendance.objects.filter(
            employee=employee,
            timestamp__gte=now() - timedelta(minutes=10)
        )
        if recent_attendance.exists():
            print("Attendance already marked recently.")
            return

        Attendance.objects.create(employee=employee, marked=True)
        print("Attendance marked.")


    def post(self, request):
        try:
            uploaded_file = request.FILES['screenshot']
            print("Uploaded Image Filename:", uploaded_file)
            # Read uploaded image into memory
            uploaded_file.seek(0)
            image_bytes = uploaded_file.read()
            np_arr = np.frombuffer(image_bytes, np.uint8)
            uploaded_image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

            if uploaded_image is None:
                return JsonResponse({"message": "Invalid image format"})

            # Try to recognize the face
            recognized_employee = self.recognize_employee(uploaded_image)
            if recognized_employee:
                # print("[DEBUG] Calling mark_attendance...")
                self.mark_attendance(recognized_employee)
                return JsonResponse({"message": f"Attendance marked for {recognized_employee}"})
            else:
                # print("[DEBUG] No recognized employee found.")
                return JsonResponse({"message": "Face verified, but no match found in database."})

        except Exception as e:
            return JsonResponse({"message": str(e)})


class AttendanceListView(APIView):
    def get(self, request):
        attendances = Attendance.objects.all()
        serializer = AttendanceSerializer(attendances, many=True)
        return Response(serializer.data)


def get_employee_id(request, employee_username):
    try:
        employee = get_object_or_404(Employee, username=employee_username)
        return JsonResponse({'employee_id': employee.id})
    except Employee.DoesNotExist:
        return JsonResponse({'error': 'Employee not found'}, status=404)
