######################
# Build the Frontend #
######################
FROM node:latest as build

WORKDIR /app
COPY  package.json ./
RUN npm install
COPY . .
RUN npm install -g @angular/cli

################
# Run in NGINX #
################
FROM nginx:alpine
COPY --from=build dist/frontend /usr/share/nginx/html

EXPOSE 80
