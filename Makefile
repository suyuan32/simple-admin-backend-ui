docker:
	pnpm install
	pnpm build
	docker build -f Dockerfile -t ${DOCKER_USERNAME}/backend-ui:${VERSION} .

docker-not-build:
	docker build -f Dockerfile -t ${DOCKER_USERNAME}/backend-ui:${VERSION} .

publish-docker:
	echo "${DOCKER_PASSWORD}" | docker login --username ${DOCKER_USERNAME} --password-stdin https://${REPO}
	docker push ${DOCKER_USERNAME}/backend-ui:${VERSION}

run-docker:
	docker volume create backendui
	docker run -d --name ${DOCKER_USERNAME}/backend-ui:${VERSION} -p 80:80 -v backendui:/etc/nginx --network docker-compose_simple-admin ${DOCKER_USERNAME}/backendui:${VERSION}