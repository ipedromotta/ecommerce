FROM python:3.10-slim

WORKDIR /app

COPY Pipfile Pipfile.lock ./

# Instala dependências do sistema
RUN apt-get update && apt-get install -y build-essential libpq-dev

RUN pip install --upgrade pip && pip install pipenv

# Instala dependências com Pipenv (sem ignorar Pipfile.lock para garantir versão travada)
RUN pipenv install --deploy --ignore-pipfile

COPY . .

# Coleta arquivos estáticos para STATIC_ROOT (de acordo com seu settings.py)
RUN pipenv run python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["pipenv", "run", "gunicorn", "configs.wsgi:application", "--bind", "0.0.0.0:8000"]
