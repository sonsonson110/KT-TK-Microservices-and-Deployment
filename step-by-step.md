## Create docker images
**Make sure docker engine is running**
### 1. Create mysql image with prepopulated ```.sql``` script
Navigate to ```./mysql```

```Dockerfile```
```Dockerfile
FROM mysql:8.0
COPY create-databases.sql /docker-entrypoint-initdb.d
```
Build image command (shell). Last parameter is the dockerfile directory (.)
```shell
docker image build -t sonsonson110/kien-truc-thiet-ke-final:mysqlv1 .
```
Push the image on public repository for K8s later
```shell
docker push sonsonson110/kien-truc-thiet-ke-final:mysqlv1
```

### 2. react app (frontend - production code only)
Navigate to ```./frontend``` directory, get all library with ```yarn```

Build the production code for react app with ```yarn build```

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
docker image build -t sonsonson110/kien-truc-thiet-ke-final:frontendv1 .
docker push sonsonson110/kien-truc-thiet-ke-final:frontendv1
```
### 3. user service
```application.properties```
```properties
# mysql is the container/service name, not localhost anymore
spring.datasource.url=jdbc:mysql://mysql:3306/user_service
spring.datasource.username=root
spring.datasource.password=password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```
Build image shell
```shell
docker image build -t sonsonson110/kien-truc-thiet-ke-final:userservicev1 .
```
Push it
```shell
docker push sonsonson110/kien-truc-thiet-ke-final:userservicev1
```
The same with other services
> **_NOTE:_**  You might not pass the spring test during build phase, but the `.jar` file would work just fine.

> **_NOTE:_**  If you have error while clean & build with Gradle, try to manually delete `.gradle` and `build` folders.

### 4. Nginx (API gateway)
`default.conf`
```nginx
# reverse proxy server define
upstream frontend {
    # service-name : assigned exposed port
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
docker image build -t sonsonson110/kien-truc-thiet-ke-final:apigatewayv1 .
docker push sonsonson110/kien-truc-thiet-ke-final:apigatewayv1
```

## Run the containers in host environment
### 1. mysql
```shell
docker run --name mysql -p <host-target-port>:3306 -e MYSQL_ROOT_PASSWORD=password -d sonsonson110/kien-truc-thiet-ke-final:mysqlv1
```
Then test the container on MySQL Workbench...

### 2. react app
```shell
docker container run -it --name frontend -p <host-target-port>:3000 -a sonsonson110/kien-truc-thiet-ke-final:frontendv1
```
### 3. user service
```shell
docker container run -it --name userservice -p <host-target-port>:8080 sonsonson110/kien-truc-thiet-ke-final:userservicev1
```
The same run with other services

### Combine services with frontend with docker-compose (and skip the 1, 2, 3)
`docker-compose.yml`
```yml
version: '1'

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
    # in case mysql not created
    restart: on-failure
    # keep open terminal
    stdin_open: true
    tty: true

    # other services...

  # create persistence volumes on host for mysql
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

