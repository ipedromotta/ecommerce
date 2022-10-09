<h1 align="center">
 <img src="https://github.com/ipedromotta/VueJS-Flask/blob/main/frontend/src/assets/logo-python.png" width="50"> <img src="https://github.com/ipedromotta/VueJS-Flask/blob/main/frontend/src/assets/logo.png" width="55"><br>Ecommerce completo utilizando Django e VueJS
</h1>

## :page_facing_up: Sobre #
Esta aplicação conta com um sistema de login completo, carrinho de compras e integração com API de pagamentos online.

## :wrench: Configuração do projeto #
### Backend
Para a inicialização do backend é necessário ativar o ambiente virtual Pipenv ( Caso não possua basta usar o comando ```pip install pipenv``` )<br>
Dentro do diretório backend utilize o comando a seguir para ativar o ambiente virtual:
```
pipenv shell
```
Após ativar o ambiente virtual, instale as dependencias com o seguinte comando:
```
pipenv install --dev
```
Agora você está com o ambiente virtual ativado e configurado, agora é preciso configurar o projeto django.<br>
Utilize o seguinte comando para criar novas migrações para alterar ou criar a estrutura do banco de dados:
```
python manage.py makemigrations
```
Em seguida, utilize o seguinte comando para criar as tabelas:
```
python manage.py migrate
```
Agora já está tudo configurado, para subir o servidor basta executar o seguinte comando:
```
python manage.py runserver
```
Agora a API já está rodando na porta <a href="http://localhost:8000/api/v1/">http://localhost:8000/api/v1/</a><br>

Descrição dos módulos utilizados no backend: <br>
```stripe``` Para criar uma integração web/movel para aceitar pagamentos online <br>
```djoser``` Fornece um conjunto facilitador para lidar com ações básicas como registro, login, logout, redefinição de senha e ativação de conta ( Funciona em conjunto com o django rest framework ) <br>
```django rest framework``` Para a criação da API <br>
```cors-hearders``` Para disponibilidade da API para o frontend <br>

### Frontend
Para iniciar o frontend também é necessário fazer a instalação das dependências. Dentro do diretório frontend execute o comando:
```
npm install
```
Após a instalação das dependências inicie a aplicação com o comando:
```
npm run dev
```
E a aplicação já estará funcionando na porta <a href="http://localhost:5173/">http://localhost:5173/</a>


## 🛠️ Tecnologias utilizadas #

Para o desenvolvimento desse projeto foram utilizadas as seguintes tecnologias:

* Django;
* VueJS;
* Bulma CSS;
* FontAwesome ( Implementação feita através do link para o CDN no index.html ).
