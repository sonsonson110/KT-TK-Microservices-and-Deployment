> Skip to [Combine services with database & frontend with docker-compose](#combine-services-with-database-and-frontend-with-docker-compose) to run app on docker engine... or [Deploy on Kubernetes](#deploy-on-kubernetes) to practice deployment on Minikube.

# Steps to create K8s deployments

## Create docker images
**Make sure docker engine is running**

### 1. Create mysql image with prepopulated ```.sql``` script
Navigate to ```./mysql```

```Dockerfile```
```Dockerfile
FROM mysql:8.0
COPY backupv2.sql /docker-entrypoint-initdb.d
```
Build image command (shell). Last parameter is the dockerfile directory (.)
```shell
docker image build -t sonsonson110/kien-truc-thiet-ke-final:mysqlv3 .
```
Push the image on public repository for K8s later
```shell
docker push sonsonson110/kien-truc-thiet-ke-final:mysqlv3
```

### 2. react app (frontend - production code only)
Navigate to ```./frontend``` directory, get all libraries with ```npm install```

Build the production code for react app with ```npm run build```

```Dockerfile```
```Dockerfile
FROM node:18-alpine
# copy the production code
COPY ./build ./build
# library handle the rest
RUN npm install -g serve
# the command which runs every time a container starts, match the copied folder name
CMD ["serve", "-s", "build"]
```
Build the frontend image and push
```shell
docker image build -t sonsonson110/kien-truc-thiet-ke-final:frontendv3 .

docker push sonsonson110/kien-truc-thiet-ke-final:frontendv3
```
### 3. user service
Navigate to ./userservice

```application.properties```
```properties
...
# mysql is the container/service name, not localhost anymore
spring.datasource.url=jdbc:mysql://mysql:3306/user_service
spring.datasource.username=root
spring.datasource.password=password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```
Clean and build project first. Then build image and push
```shell
docker image build -t sonsonson110/kien-truc-thiet-ke-final:userservicev3 .

docker push sonsonson110/kien-truc-thiet-ke-final:userservicev3
```
The same with other services
> **_NOTE:_**  You might not pass the spring test during build phase, but the `.jar` file would work just fine.

> **_NOTE:_**  If you have errors while clean & build with Gradle, try to manually delete `.gradle` and `build` folders.

### 4. nginx (API gateway)
Navigate to `./nginx`

`default.conf`
```nginx
# reverse proxy server define
upstream frontend {
    # service-name : container's internal port
    server frontend:3000;
}
upstream userservice {
    server userservice:8080;
}
# ... you-defined server
server {
    listen 80;

    location / {
        proxy_pass http://frontend;
    }

    location /api/resellers/ {
        # remove the /api part
        rewrite /api/(.*) /$1 break;
        proxy_pass http://reselleservice;
    }
    # ... other locations or configurations
}
```
`Dockerfile`
```Dockerfile
FROM nginx:1.25.4
COPY ./default.conf /etc/nginx/conf.d/default.conf
```
Build the image and push
```shell
docker image build -t sonsonson110/kien-truc-thiet-ke-final:apigatewayv3 .

docker push sonsonson110/kien-truc-thiet-ke-final:apigatewayv3
```

## Test the image by running container on host
### 1. mysql
```shell
docker run --name mysql -p <host-target-port>:3306 -e MYSQL_ROOT_PASSWORD=password -d sonsonson110/kien-truc-thiet-ke-final:mysqlv3
```
Then test the container on Client GUI...

### 2. react app
```shell
docker container run -it --name frontend -p <host-target-port>:3000 sonsonson110/kien-truc-thiet-ke-final:frontendv3
```
### 3. user service
```shell
docker container run -it --name userservice -p <host-target-port>:8080 sonsonson110/kien-truc-thiet-ke-final:userservicev3
```
The same run with other services
> **Note**: remember to expose mysql container port and modify the `application.properties` before building image to test each service container.

## Combine services with database and frontend with docker-compose
`docker-compose.yml`
```yml
version: '3'

services:
  mysql:
    image: "sonsonson110/kien-truc-thiet-ke-final:mysqlv1"
    environment:
      - MYSQL_ROOT_PASSWORD=password
    restart: unless-stopped
    volumes:
      - db:/var/lib/mysql
    # only expose for the sake of watching on host
    ports:
      - 3306:3306

  frontend:
    image: "sonsonson110/kien-truc-thiet-ke-final:frontendv1"
    stdin_open: true

  apigateway:
    depends_on:
      - userservice
      - resellerservice
      - supplierservice
      - productservice
      - frontend
    image: "sonsonson110/kien-truc-thiet-ke-final:apigatewayv1"
    restart: always
    ports:
      - "3050:80"


  userservice:
    depends_on:
      - mysql
    image: "sonsonson110/kien-truc-thiet-ke-final:userservicev1"
    # in case mysql not yet created
    restart: on-failure
    # keep open terminal
    stdin_open: true
    tty: true

    # other services...

  # create persistent volume on host for mysql
  volumes:
    db:
```
Fire the docker-compose file (detachable)
```shell
docker-compose up -d
```
> **_NOTE:_** Wait for a few seconds for fully loaded containers, or else some frontend routes may throw errors.

See log output from a container
```shell
docker logs -f <container-id>
```
Check it out on browser host machine with nginx exposed port 3050: `localhost:3050`

## Deploy on Kubernetes
The following steps will deploy app on Kubernetes locally with `Minikube` and `Docker`. Due to resource limitation, only 1 node is used on K8s cluster.
> **_NOTE_** If you are not familiar with minikube, visit [Hello Minikube tutorial](https://kubernetes.io/docs/tutorials/hello-minikube/) to get development environment & get familiar with K8s

According to [baeldung](https://www.baeldung.com/ops/minikube-getting-started):
- A deployment object manages a set of replicas of an application and ensures that the desired state is maintained.
- A service is an abstraction that exposes a group of pods as a network service.

See detaily in `k8s-deployment` & `k8s-service` folders.


> **_NOTE:_** Delete old minikube volume on host machine Docker Desktop to ensure the step-by-step results. **For beginners, skip this note**.

> **_NOTE:_** Each deployment will take a while because you're pulling the images from public repo to minikube for the first time, keep tracking with
> - `kubectl get deployments`
> - `kubectl get pods`

### 1. Start Minikube
```shell
minikube start
```
This step might take a while on first run
### 2. Deploy mysql
- A persistent volume (PV) is the "physical" volume on the host machine that stores your persistent data.
- A persistent volume claim (PVC) is a request for the platform to create a PV for you, and you attach PVs to your pods via a PVC.
> PVs are resources in the cluster. PVCs are requests for those resources and also act as claim checks to the resource.
>
> Pod -> PVC -> PV -> Host machine

```shell
kubectl apply -f k8s-mysql
```

### 3. Apply deployment objects for frontend & backend
```shell
kubectl apply -f k8s-deployment
```

Open new terminal and start mysql service to inspect from host with client GUI

```shell
minikube service mysql
```

### 4. Apply service objects for frontend & backend
```shell
kubectl apply -f k8s-service
```
Check for created service
```shell
kubectl get svc
```

### 5. Expose the app on host machine
```shell
minikube service nginx-service
```

### Clean up
```shell
kubectl delete svc --all
kubectl delete deployment --all
minikube stop
```

# K8S DEBUGGING
See realtime log from a deployment
```shell
# should be opened in new terminal
kubectl logs deployment/<deployment-name> -f
```

# Miscellanea
Dump or restore mysql data in docker container
```shell
# Backup
docker exec CONTAINER_ID /usr/bin/mysqldump -u root --password=password --all-databases > backup.sql

# Restore
cat backup.sql | docker exec -i CONTAINER /usr/bin/mysql -u root --password=root DATABASE
```