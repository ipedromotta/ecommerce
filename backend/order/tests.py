from django.test import TestCase
from django.contrib.auth.models import User
from product.models import Category, Product
from order.models import Order, OrderItem


class OrderModelCRUDTest(TestCase):
    def setUp(self):
        # Cria um usuário de teste
        self.user = User.objects.create_user(username='usuario', password='12345')

        # Cria uma categoria e produto para o item do pedido
        self.category = Category.objects.create(name="Livros", slug="livros")
        self.product = Product.objects.create(
            category=self.category,
            name="Livro Python",
            slug="livro-python",
            price=89.90
        )

    def test_create_order(self):
        # Cria um pedido com os dados básicos
        order = Order.objects.create(
            user=self.user,
            first_name="Maria",
            last_name="Oliveira",
            email="maria@email.com",
            address="Rua Exemplo, 123",
            zipcode="00000-000",
            place="Rio de Janeiro",
            phone="21999999999",
            paid_amount=179.80,
            stripe_token="tok_test123"
        )

        # Verifica se o pedido foi salvo corretamente
        self.assertIsNotNone(order.id)
        self.assertEqual(order.first_name, "Maria")
        self.assertEqual(order.user.username, "usuario")

    def test_create_order_item(self):
        # Cria o pedido
        order = Order.objects.create(
            user=self.user,
            first_name="Maria",
            last_name="Oliveira",
            email="maria@email.com",
            address="Rua Exemplo, 123",
            zipcode="00000-000",
            place="Rio de Janeiro",
            phone="21999999999",
            paid_amount=179.80,
            stripe_token="tok_test123"
        )

        # Cria um item de pedido associado ao pedido e produto
        item = OrderItem.objects.create(
            order=order,
            product=self.product,
            price=self.product.price,
            quantity=2
        )

        # Valida se o item foi criado corretamente
        self.assertIsNotNone(item.id)
        self.assertEqual(item.quantity, 2)
        self.assertEqual(item.price, 89.90)
        self.assertEqual(item.product.name, "Livro Python")

    def test_update_order(self):
        # Cria um pedido
        order = Order.objects.create(
            user=self.user,
            first_name="Carlos",
            last_name="Moura",
            email="carlos@email.com",
            address="Rua X",
            zipcode="99999-999",
            place="Curitiba",
            phone="41999999999",
            paid_amount=50.00,
            stripe_token="tok_test456"
        )

        # Atualiza o campo nome
        order.first_name = "Carlos Eduardo"
        order.save()

        # Verifica se a mudança foi persistida
        updated = Order.objects.get(id=order.id)
        self.assertEqual(updated.first_name, "Carlos Eduardo")

    def test_delete_order(self):
        # Cria um pedido
        order = Order.objects.create(
            user=self.user,
            first_name="Ana",
            last_name="Silva",
            email="ana@email.com",
            address="Rua Z",
            zipcode="88888-888",
            place="Salvador",
            phone="71999999999",
            paid_amount=120.00,
            stripe_token="tok_test789"
        )
        order_id = order.id

        # Deleta o pedido
        order.delete()

        # Verifica se ele foi removido
        with self.assertRaises(Order.DoesNotExist):
            Order.objects.get(id=order_id)
