from django.contrib import admin
from django.utils.html import format_html
from .models import Categoria, Produto, Cliente, Pedido, ItemPedido, Endereco, ImagemProduto

# ---------- Categoria ----------
@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'categoria_pai')
    list_filter = ('categoria_pai',)
    search_fields = ('nome', 'slug')
    prepopulated_fields = {"slug": ("nome",)}

# ---------- Imagens Inline (Produto) ----------
class ImagemProdutoInline(admin.TabularInline):
    model = ImagemProduto
    extra = 1

# ---------- Produto ----------
@admin.register(Produto)
class ProdutoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'categoria', 'preco', 'estoque', 'criado_em', 'imagem_tag')
    list_filter = ('categoria',)
    search_fields = ('nome', 'descricao')
    prepopulated_fields = {"slug": ("nome",)}
    inlines = [ImagemProdutoInline]

    def imagem_tag(self, obj):
        if obj.imagem:
            return format_html('<img src="{}" width="50" style="object-fit:cover;"/>', obj.imagem.url)
        return "-"
    imagem_tag.short_description = 'Imagem'

# ---------- Endereço Inline (Cliente) ----------
class EnderecoInline(admin.TabularInline):
    model = Endereco
    extra = 1

# ---------- Cliente ----------
@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ('nome', 'email', 'telefone')
    inlines = [EnderecoInline]

# ---------- Itens Inline (Pedido) ----------
class ItemPedidoInline(admin.TabularInline):
    model = ItemPedido
    extra = 1

# ---------- Pedido ----------
@admin.register(Pedido)
class PedidoAdmin(admin.ModelAdmin):
    list_display = ('cliente', 'data', 'status', 'total')
    list_filter = ('status', 'data')
    search_fields = ('cliente__nome',)
    inlines = [ItemPedidoInline]

# ---------- ItemPedido ----------
@admin.register(ItemPedido)
class ItemPedidoAdmin(admin.ModelAdmin):
    list_display = ('pedido', 'produto', 'quantidade', 'preco_unitario', 'get_subtotal')

    @admin.display(description='Subtotal')
    def get_subtotal(self, obj):
        return obj.subtotal()
