# This monolith Dockerfile:
# Uses FastAPI to serve static assets
# Uses gunicorn as a process manager to run the FastAPI app

FROM node:alpine as frontend-build
RUN npm i -g pnpm

WORKDIR /app

COPY frontend/package.json frontend/pnpm-lock.yaml /app/

RUN pnpm install

COPY frontend /app/

RUN pnpm build

FROM python:3.11

ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install Poetry
RUN curl -sSL https://install.python-poetry.org | POETRY_HOME=/opt/poetry python && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create false

COPY backend/pyproject.toml backend/poetry.lock /app/

RUN poetry install --no-root

COPY backend /app

COPY --from=frontend-build /app/dist /app/static

CMD gunicorn -k uvicorn.workers.UvicornWorker -b :8000 main:app
