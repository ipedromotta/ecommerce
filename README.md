backend
para ativar o ambiente virtual: pipenv shell e para instalar as dependencias pipenv install --dev
depois utilize o comando pipenv python manage.py makemigrations para criar novas migrações para alterar ou criar a estrutura do banco de dados e depois pipenv manage.py migrate para criar as tabelas
Módulos utilizados:
- django rest framework para criação da API
- cors-hearders para disponibilidade da API para o frontend
- djoser fornece um conjunto facilitador para lidar com ações básicas como registro, login, logout, redefinição de senha e ativação de conta ( Funciona em conjunto com o django rest framework )
- stripe para criar uma integração da web/movel para aceitar pagamentos online
- pillow para a manipulação de imagens


frontend:
Foi adicionado um link para o cdn do FontAwesome no index.html
Foi utilizado o Bulma CSS para estilização
