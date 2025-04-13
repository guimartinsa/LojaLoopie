from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from django.utils.html import mark_safe


class Categoria(models.Model):
    nome = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    categoria_pai = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='subcategorias'
    )

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nome)
        super().save(*args, **kwargs)

    def __str__(self):
        if self.categoria_pai:
            return f"{self.categoria_pai} > {self.nome}"
        return self.nome


class Produto(models.Model):
    nome = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    descricao = models.TextField()
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    imagem = models.ImageField(upload_to='produtos/', blank=True, null=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, blank=True)
    estoque = models.PositiveIntegerField(default=0)
    criado_em = models.DateTimeField(auto_now_add=True)

    def imagem_preview(self):
        if self.imagem:
            return mark_safe(f'<img src="{self.imagem.url}" width="100" />')
        return "Nenhuma imagem"
    imagem_preview.short_description = 'Preview'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nome)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nome

class ImagemProduto(models.Model):
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE, related_name='imagens')
    imagem = models.ImageField(upload_to='produtos/')
    legenda = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"Imagem de {self.produto.nome}"


# loja/models.py

class Cliente(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    telefone = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.nome

class Pedido(models.Model):
    STATUS_CHOICES = [
        ('pendente', 'Pendente'),
        ('processando', 'Processando'),
        ('enviado', 'Enviado'),
        ('concluido', 'Concluído'),
    ]

    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    data = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pendente')
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f'Pedido #{self.id} - {self.cliente.nome}'

    def calcular_total(self):
        return sum(item.subtotal() for item in self.itens.all())
    
    def save(self, *args, **kwargs):
        #self.total = self.calcular_total()
        super().save(*args, **kwargs)


class ItemPedido(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name='itens')
    produto = models.ForeignKey('Produto', on_delete=models.CASCADE)
    quantidade = models.PositiveIntegerField(default=1)
    preco_unitario = models.DecimalField(max_digits=10, decimal_places=2)

    def subtotal(self):
        return self.quantidade * self.preco_unitario

    def __str__(self):
        return f'{self.quantidade}x {self.produto.nome}'

# loja/models.py

class Endereco(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='enderecos')
    rua = models.CharField(max_length=255)
    numero = models.CharField(max_length=10)
    complemento = models.CharField(max_length=255, blank=True)
    bairro = models.CharField(max_length=100)
    cidade = models.CharField(max_length=100)
    estado = models.CharField(max_length=2)  # Ex: SP, RJ
    cep = models.CharField(max_length=10)
    tipo = models.CharField(
        max_length=20,
        choices=[('entrega', 'Entrega'), ('cobranca', 'Cobrança')],
        default='entrega'
    )

    def __str__(self):
        return f'{self.rua}, {self.numero} - {self.cidade}/{self.estado}'
