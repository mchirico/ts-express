PROJECT = cwxstat-23
NAME = ts-express
TAG = dev


docker-build:
	docker build --no-cache -t gcr.io/$(PROJECT)/$(NAME):$(TAG) -f Dockerfile .


sh:
	docker run --rm -it --entrypoint /bin/sh gcr.io/cwxstat-23/ts:dev

run:
	docker run --rm -it gcr.io/$(PROJECT)/$(NAME):$(TAG) 
