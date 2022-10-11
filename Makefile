docker:
	yarn install
	yarn build
	docker build -f Dockerfile -t ${DOCKER_USERNAME}/backendui:${VERSION} .

publish-docker:
	echo "${DOCKER_PASSWORD}" | docker login --username ${DOCKER_USERNAME} --password-stdin http://${REPO}
	docker push ${REPO}/${DOCKER_USERNAME}/backendui:${VERSION}

run-docker:
	docker volume create backendui
	docker run -d --name ${DOCKER_USERNAME}/backendui:${VERSION} -p 80:80 -v backendui:/etc/nginx --network docker-compose_simple-admin ${DOCKER_USERNAME}/backendui:${VERSION}