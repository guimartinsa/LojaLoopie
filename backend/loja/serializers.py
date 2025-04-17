from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Produto, Categoria, Cliente, Endereco, ImagemProduto, Pedido, ItemPedido

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class ProdutoSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer()

    class Meta:
        model = Produto
        fields = '__all__'

class EnderecoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endereco
        fields = '__all__'


class ClienteSerializer(serializers.ModelSerializer):
    enderecos = EnderecoSerializer(many=True, read_only=True)
    enderecos_data = EnderecoSerializer(many=True, write_only=True, required=False)
    usuario = serializers.PrimaryKeyRelatedField(read_only=True)  # Só exibe o ID do user

    class Meta:
        model = Cliente
        fields = ['id', 'usuario', 'nome', 'email', 'telefone', 'enderecos', 'enderecos_data']

    def create(self, validated_data):
        enderecos_data = validated_data.pop('enderecos_data', [])
        user = self.context['request'].user  # <- pega o user logado (ex: em registro autenticado)
        cliente = Cliente.objects.create(usuario=user, **validated_data)
        for endereco in enderecos_data:
            Endereco.objects.create(cliente=cliente, **endereco)
        return cliente

    class Meta:
        model = Cliente
        fields = ['id', 'nome', 'email', 'telefone', 'enderecos', 'enderecos_data']

    def create(self, validated_data):
        enderecos_data = validated_data.pop('enderecos_data', [])
        cliente = Cliente.objects.create(**validated_data)
        for endereco in enderecos_data:
            Endereco.objects.create(cliente=cliente, **endereco)
        return cliente

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user


class ImagemProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagemProduto
        fields = ['id', 'imagem', 'legenda']

class ProdutoSerializer(serializers.ModelSerializer):
    imagens = ImagemProdutoSerializer(many=True, read_only=True)
    imagem_principal = serializers.ImageField(source='imagem', read_only=True)

    class Meta:
        model = Produto
        fields = [
            'id', 'nome', 'descricao', 'preco',
            'imagem_principal', 'imagens',
            'categoria', 'estoque', 'criado_em', 'slug'
        ]

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nome', 'slug', 'categoria_pai']

class ItemPedidoSerializer(serializers.ModelSerializer):
    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = ItemPedido
        fields = ['id', 'produto', 'quantidade', 'preco_unitario', 'subtotal']

    def get_subtotal(self, obj):
        return obj.subtotal()


class PedidoSerializer(serializers.ModelSerializer):
    itens = ItemPedidoSerializer(many=True)

    class Meta:
        model = Pedido
        fields = ['id', 'data', 'status', 'total', 'itens']
        read_only_fields = ['total', 'data']

    def create(self, validated_data):
        itens_data = validated_data.pop('itens')
        cliente = self.context['request'].user.cliente  # usa cliente do user logado
        pedido = Pedido.objects.create(cliente=cliente, **validated_data)

        for item_data in itens_data:
            ItemPedido.objects.create(pedido=pedido, **item_data)

        pedido.total = pedido.calcular_total()
        pedido.save()

        return pedido

