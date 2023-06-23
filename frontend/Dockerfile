######################
# Build the Frontend #
######################
FROM node:16 as build
WORKDIR /app
COPY  package.json ./
RUN npm install
COPY . .
RUN npm install -g @angular/cli
RUN npm install leaflet
RUN npm install proj4
RUN npm install rxjs
RUN ng build --configuration production --output-path=/dist/frontend

################
# Run in NGINX #
################
FROM nginx:alpine
COPY --from=build /dist/frontend /usr/share/nginx/html
