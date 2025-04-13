from rest_framework import serializers
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
    # Para criar endereços junto com o cliente (opcional)
    enderecos_data = EnderecoSerializer(many=True, write_only=True, required=False)

    class Meta:
        model = Cliente
        fields = ['id', 'nome', 'email', 'telefone', 'enderecos', 'enderecos_data']

    def create(self, validated_data):
        enderecos_data = validated_data.pop('enderecos_data', [])
        cliente = Cliente.objects.create(**validated_data)
        for endereco in enderecos_data:
            Endereco.objects.create(cliente=cliente, **endereco)
        return cliente

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
        fields = ['id', 'cliente', 'data', 'status', 'total', 'itens']
        read_only_fields = ['total', 'data']

    def create(self, validated_data):
        itens_data = validated_data.pop('itens')
        pedido = Pedido.objects.create(**validated_data)

        for item_data in itens_data:
            ItemPedido.objects.create(pedido=pedido, **item_data)

        pedido.total = pedido.calcular_total()
        pedido.save()

        return pedido

