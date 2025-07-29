from django.test import TestCase
from product.models import Category, Product


class ProductModelCRUDTest(TestCase):
    def setUp(self):
        # Cria uma categoria para associar aos produtos
        self.category = Category.objects.create(name="Tecnologia", slug="tecnologia")

    def test_create_product(self):
        # Cria um produto associado à categoria criada
        product = Product.objects.create(
            category=self.category,
            name="Mouse Gamer",
            slug="mouse-gamer",
            price=150.00
        )
        # Verifica se o produto foi criado corretamente
        self.assertIsNotNone(product.id)
        self.assertEqual(product.name, "Mouse Gamer")
        self.assertEqual(product.category.name, "Tecnologia")

    def test_update_product(self):
        # Cria um produto
        product = Product.objects.create(
            category=self.category,
            name="Teclado",
            slug="teclado",
            price=200.00
        )
        # Atualiza o nome do produto
        product.name = "Teclado Mecânico"
        product.save()

        # Busca o produto novamente e verifica se o nome foi atualizado
        updated_product = Product.objects.get(id=product.id)
        self.assertEqual(updated_product.name, "Teclado Mecânico")

    def test_delete_product(self):
        # Cria um produto
        product = Product.objects.create(
            category=self.category,
            name="Webcam",
            slug="webcam",
            price=350.00
        )
        product_id = product.id

        # Deleta o produto
        product.delete()

        # Verifica se ele realmente foi removido do banco
        with self.assertRaises(Product.DoesNotExist):
            Product.objects.get(id=product_id)
