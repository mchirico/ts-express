PROJECT = cwxstat-23
NAME = tsexpress
TAG = dev


docker-build:
	rm -rf static
	(cd angular && ./updateStatic.sh)
	docker build --no-cache -t gcr.io/$(PROJECT)/$(NAME):$(TAG) -f Dockerfile .


deploy:
	gcloud config set gcloudignore/enabled false --project $(PROJECT)
	gcloud builds submit --tag gcr.io/$(PROJECT)/$(NAME)cloud --project $(PROJECT) --timeout 35m23s
	gcloud run deploy $(NAME)cloud --image gcr.io/$(PROJECT)/$(NAME)cloud \
              --platform managed --allow-unauthenticated --project $(PROJECT) \
              --region us-east1 --port 3000 --max-instances 3  --memory 128Mi


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
