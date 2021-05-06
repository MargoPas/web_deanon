include .env
export $(shell sed 's/=.*//' .env)

dev-server:
	mkdir -p ./docker-data
	docker-compose up -d sample-postgres
	yarn migration:run
	yarn dev

prod:
	mkdir -p ./docker-data
	docker-compose up
prod-migration:
	docker-compose exec sample-nodejs yarn migration:run