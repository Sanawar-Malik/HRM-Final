from datetime import datetime, timezone
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

current_timestamp = datetime.now()
class UserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, gender, role, document, date_of_birth, city, country, degree, phone, address, image, password=None, password2=None, department=None,):
        """
        Creates and saves a User with the given email, name, tc, password and password2.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            gender=gender,
            phone=phone,
            address=address,
            image=image,
            role=role,
            document=document,
            city=city,
            country=country,
            degree=degree,
            date_of_birth=date_of_birth,
            department=department,

        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, gender, document, date_of_birth, city, country, degree, role, phone, address, image, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            gender=gender,
            phone=phone,
            address=address,
            image=image,
            role=role,
            document=document,
            city=city,
            country=country,
            degree=degree,
            date_of_birth=date_of_birth,


        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class Employee(AbstractBaseUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('employee', 'Employee'),
        ('manager', 'Manager'),
    )
    email = models.EmailField(verbose_name='Email',
                              max_length=255, unique=True)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    gender = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=200)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    role = models.CharField(max_length=200)
    degree = models.CharField(max_length=200)
    date_of_birth = models.DateField(null=True, blank=True)
    department = models.ForeignKey(
        "Department", blank=True, null=True, on_delete=models.CASCADE)
    country = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    document = models.FileField(upload_to="files/", null=True, blank=True)
    image = models.ImageField(
        upload_to="register/")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name',
                       'gender', 'phone', 'address', 'image', 'role', 'document', 'date_of_birth', 'city', 'country', 'degree']

    def __str__(self):
        return self.first_name

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @ property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin



class Department(models.Model):
    name = models.CharField(max_length=200, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Project(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    members = models.ManyToManyField(
        "Employee", blank=True, related_name='project_employee')
    manager = models.ForeignKey("Employee", related_name='project_manager',
                                blank=True, null=True, on_delete=models.SET_NULL)
    created_at = models.DateField(auto_now_add=False)
    end_at = models.DateField(auto_now_add=False)

    def __str__(self):
        return self.name


class Task(models.Model):
    STATUS_TYPE = (
        ('PROGRESS', 'Progress'),
        ('COMPLETED', 'COMPLETE')
    )

    project = models.ForeignKey(
        "Project", blank=True, null=True, on_delete=models.CASCADE)
    add = models.CharField(max_length=300)
    employee = models.ForeignKey(
        "Employee", on_delete=models.CASCADE, null=True)
    status = models.CharField(max_length=20,
        choices=STATUS_TYPE, default='START', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)


class Salary(models.Model):
    employee = models.ForeignKey("Employee", on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    allowance = models.DecimalField(
        max_digits=10, decimal_places=2, default=0.00)
    medical = models.DecimalField(
        max_digits=10, decimal_places=2, default=0.00)


class Attendance(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    marked = models.BooleanField(default=False)


    def __str__(self):
        return f'{self.employee.first_name} - {self.timestamp}'
