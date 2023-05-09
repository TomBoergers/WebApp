FROM maven:3.8.6-openjdk-18 AS build
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app
RUN mvn -f /usr/src/app/pom.xml clean install package

FROM openjdk:18-jdk-alpine
VOLUME /tmp
COPY --from=build /usr/src/app/target/* /usr/app/
COPY src/main/java/com/springend/backend/BackendApplication.java /usr/app/
WORKDIR /usr/app/
EXPOSE 8080
CMD ["java","com.springend.backend.BackendApplication"]