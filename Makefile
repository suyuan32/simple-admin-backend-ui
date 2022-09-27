version := 0.0.6
user := ryan

docker:
	yarn install
	yarn build
	sudo docker build -f Dockerfile -t backendui:$(version) .

run-docker:
	sudo docker volume create backendui
	sudo docker run -d --name backendui-$(version) -p 80:80 -v backendui:/etc/nginx --network docker-compose_simple-admin backendui:$(version)