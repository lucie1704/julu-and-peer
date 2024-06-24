# Makefile for Docker Compose Project

# Variables
DOCKER_COMPOSE := docker-compose

# Targets
.PHONY: help
help:
	@echo "Please use 'make <target>' where <target> is one of"
	@echo "  up			: Start containers"
	@echo "  down			: Stop and remove containers, networks, volumes"
	@echo "  restart-frontend     	: Restart containers"
	@echo "  restart-frontend	: Restart frontend container"
	@echo "  restart-backend	: Restart backend container"
	@echo "  backend-shell		: Open a shell session in the backend container"
	@echo "  frontend-shell	: Open a shell session in the frontend container"
	@echo "  migrate		: Sequelize migrate"
	@echo "  seeders		: Load all seeders"



up:
	$(DOCKER_COMPOSE) up -d

down:
	$(DOCKER_COMPOSE) down

restart:
	$(DOCKER_COMPOSE) restart

restart-frontend:
	$(DOCKER_COMPOSE) restart frontend

restart-backend:
	$(DOCKER_COMPOSE) restart frontend

backend-shell:
	$(DOCKER_COMPOSE) exec -it backend bash

frontend-shell:
	$(DOCKER_COMPOSE) exec -it frontend bash

migrate:
	$(DOCKER_COMPOSE) exec -it backend sequelize db:migrate

seeders:
	$(DOCKER_COMPOSE) exec -it backend sequelize db:seed:all

gitlog:
	git log --oneline -n10