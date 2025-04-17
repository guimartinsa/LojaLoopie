from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from .views import ProdutoViewSet, CategoriaViewSet, ClienteViewSet, EnderecoViewSet, PedidoViewSet, ItemPedidoViewSet, RegistroView

router = DefaultRouter()
router.register(r'produtos', ProdutoViewSet)
router.register(r'categorias', CategoriaViewSet)
router.register(r'clientes', ClienteViewSet)
router.register(r'enderecos', EnderecoViewSet)
router.register(r'pedidos', PedidoViewSet)
router.register(r'itens-pedido', ItemPedidoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', obtain_auth_token),   # já vem do DRF
    path('registro/', RegistroView.as_view()),
]
