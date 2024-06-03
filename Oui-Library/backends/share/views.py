# accounts/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from .models import UserAccount, Book
from .serializers import BookSerializer, UserAccountSerializer, BalanceSerializer, ReservedSerializer,LendSerializer
from .auth import IsAdminPermission



class UserAccountViewSet(viewsets.ModelViewSet):
    queryset = UserAccount.objects.all()
    serializer_class = UserAccountSerializer

    
    # User Views
    
    
    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
    def facucet_user_account(self, request, pk):
        try:
            user = UserAccount.objects.get(matric_number = request.user.matric_number)
            user.balance.facucetAccount()
            balance_serializer = BalanceSerializer(user.balance)
            return Response(balance_serializer.data)
        except UserAccount.DoesNotExist:
            return Response({"Error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
    def get_books_by_category(self, request,category):
        try:
            books = Book.objects.get(category = category)
            books_serializer = BookSerializer(books)
            return Response(books_serializer.data)
        except UserAccount.DoesNotExist:
            return Response({"Error": "Categroy Not Found"}, status=status.HTTP_404_NOT_FOUND)
        
    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
    def get_recomended_books(self, request, pk):
        try:
            user = UserAccount.objects.get(matric_number = request.matic_number)
            groups = user.preferance.category_selection.split(',')
            from django.db.models import Q as ConstructorQuery
            query = ConstructorQuery()
            for match in groups:
                query |= ConstructorQuery(category__contains="<%s<" % match)
            user_books_category = Book.objects.filter(query)
            books_serializers = BookSerializer(user_books_category)
            return Response(books_serializers.data)
        except UserAccount.DoesNotExist:
            return Response({"Error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
    
        
    @action(detail=True, methods=['get'])
    def get_user_balance(self, request,pk):
        try:
            user = UserAccount.objects.get(matric_number = request.user.matric_number)
            balance_serializer = BalanceSerializer(user.balance)
            return Response(balance_serializer.data)
        except UserAccount.DoesNotExist:
            return Response({"Error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
################################Admin Views #######################################
    @action(detail=True, methods=['get'])
    def get_user_balance(self, request,matric_number):
        try:
            user = UserAccount.objects.get(matric_number = matric_number)
            balance_serializer = BalanceSerializer(user.balance)
            return Response(balance_serializer.data)
        except UserAccount.DoesNotExist:
            return Response({"Error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    
           
    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated, IsAdminPermission])
    def get_user_balance_by_admin(self, request, matric_Number):
        try:
            user = BalanceSerializer(UserAccount.objects.get(matric_number = request.user.matric_number).balance)
            if user.is_valid():
                return Response(user.data)
        except UserAccount.DoesNotExist:
            return Response({"Error":"User with matric number does not exist" }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
    def get_user_reservation_plan(self, request ,pk):
        try:
            user = (UserAccount.objects.get(matric_number = request.user.matric_number).lent)
            return Response({'reserved_plan':ReservedSerializer(user).data})
        except UserAccount.DoesNotExist:
            return Response({"Error":"Unable to get user balance" }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated, IsAdminPermission])
    def get_user_reservation_plan_by_admin(self, request, pk):
        try:
            user = (UserAccount.objects.get(matric_number = request.user.matric_number).reserved)
            # print(user)
            return Response({'reserved_plan':ReservedSerializer(user).data})
        except UserAccount.DoesNotExist:
            return Response({"Error":"User with matric number does not exist" }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
    def get_user_lent_plan(self, request, pk=None):
        try:
            user = (UserAccount.objects.get(matric_number = request.user.matric_number).lent)
            # print(user)
            return Response({'lent_plan':LendSerializer(user).data})
        except UserAccount.DoesNotExist:
            return Response({"Error":"Unable to get user lent books" }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated, IsAdminPermission])
    def get_user_lent_plan_by_admin(self, request, pk):
        try:
            user = (UserAccount.objects.get(matric_number = request.user.matric_number).lent)
            if user.is_valid():
                return Response(user.data)
        except UserAccount.DoesNotExist:
            return Response({"Error":"User with matric number does not exist" }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Other CRUD operations (retrieve, create, update, delete) for UserAccount
    def retrieve(self, request, *args, **kwargs):
        # Implement retrieve operation
        pass

    def create(self, request, *args, **kwargs):
        # Implement create operation
        pass

    def update(self, request, *args, **kwargs):
        # Implement update operation
        pass

    def destroy(self, request, *args, **kwargs):
        # Implement delete operation
        pass
