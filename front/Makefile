include .env
export $(shell sed 's/=.*//' .env)

nginxContainerName = front-regina

dev:
		yarn webpack --mode development
prod:
		yarn build-prod
server:
		docker-compose up -d ${nginxContainerName}