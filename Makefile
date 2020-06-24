PROJECT = cwxstat-23
NAME = tsexpress
TAG = dev


docker-build:
	docker build --no-cache -t gcr.io/$(PROJECT)/$(NAME):$(TAG) -f Dockerfile .


sh:
	docker run --rm -it --entrypoint /bin/sh gcr.io/cwxstat-23/ts:dev


daemon:
	docker run -p 3000:3000 --rm -it -d --name $(NAME) gcr.io/$(PROJECT)/$(NAME):$(TAG)

run:
	docker run -p 3000:3000 --rm -it --name $(NAME)  gcr.io/$(PROJECT)/$(NAME):$(TAG) 

stop:
	docker stop $(NAME)

logs:
	docker logs $(NAME)
