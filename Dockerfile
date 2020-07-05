FROM node AS build
RUN mkdir /workspace
WORKDIR /workspace
COPY . /workspace

RUN apt-get update -y
RUN apt-get install -y  openjdk-8-jdk
RUN npm install -g firebase-tools

RUN npm install
RUN npm test
RUN npm run build



FROM node:current-alpine
COPY --from=build /workspace /workspace

WORKDIR /workspace
RUN npm rebuild grpc
ENTRYPOINT ["npm"]
CMD ["start"]
