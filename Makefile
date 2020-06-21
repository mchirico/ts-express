PROJECT = cwxstat-23
NAME = ts
TAG = dev


docker-build:
	docker build --no-cache -t gcr.io/$(PROJECT)/$(NAME):$(TAG) -f Dockerfile .


run:
	docker run --rm -it gcr.io/$(PROJECT)/$(NAME):$(TAG) 
