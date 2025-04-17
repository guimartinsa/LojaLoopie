from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Produto, Categoria, Cliente, Endereco
from .serializers import ProdutoSerializer, CategoriaSerializer, ClienteSerializer, EnderecoSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

class ProdutoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'  # <- isso aqui faz a mágica

class CategoriaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [AllowAny]

class RegistroView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=201)
        return Response(serializer.errors, status=400)

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class EnderecoViewSet(viewsets.ModelViewSet):
    queryset = Endereco.objects.all()
    serializer_class = EnderecoSerializer

from rest_framework import viewsets
from loja.models import Pedido, ItemPedido
from .serializers import PedidoSerializer, ItemPedidoSerializer

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all().order_by('-data')
    serializer_class = PedidoSerializer
    permission_classes = [IsAuthenticated]  # 👈 Só logados

    def perform_create(self, serializer):
        serializer.save(cliente=self.request.user.cliente)  # 👈 Associa ao cliente logado

class ItemPedidoViewSet(viewsets.ModelViewSet):
    queryset = ItemPedido.objects.all()
    serializer_class = ItemPedidoSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def usuario_logado(request):
    return Response({
        'id': request.user.id,
        'username': request.user.username,
        'email': request.user.email,
    })