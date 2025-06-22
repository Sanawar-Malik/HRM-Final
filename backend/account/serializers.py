from rest_framework import serializers
from account.models import Attendance, Department, Project, Employee, Salary, Task

from rest_framework.serializers import ValidationError


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


class SalarySerializer(serializers.ModelSerializer):
    total = serializers.SerializerMethodField()

    class Meta:
        model = Salary
        fields = '__all__'

    def get_total(self, obj):
        return float(obj.amount + obj.medical + obj.allowance)


class EmployeeSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)
    image = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = Employee
        fields = ['id', 'email', 'first_name', 'last_name', 'gender',
                  'phone', 'address', 'image', 'password', 'password2', 'date_of_birth', 'role', 'document', 'city', 'country', 'degree', 'department', 'created_at']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError(
                'Password and confirm Password does not match')
        return attrs

    def create(self, validate_data):
        return Employee.objects.create_user(**validate_data)

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        validated_data.pop('password2', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)  # ← hashes password properly
        instance.save()
        return instance




class EmployeeLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        model = Employee
        fields = ['email', 'password']


class EmployeeProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'email', 'first_name', 'last_name',
                  'image', 'gender', 'address', 'phone', 'role', 'document', 'city', 'country', 'degree', 'department', 'date_of_birth', 'created_at']


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'
