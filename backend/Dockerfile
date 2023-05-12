FROM maven:3.8.6-openjdk-18 AS build
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app
RUN mvn -f /usr/src/app/pom.xml clean install -Dmaven.test.skip=true

FROM openjdk:18-jdk-alpine
ENV IN_CONTAINER=true
RUN mkdir -p /usr/src/app/Datentabellen
VOLUME /tmp
COPY --from=build /usr/src/app/target/* /usr/app/
COPY src/main/java/com/springend/backend/Datentabellen /usr/src/app/Datentabellen
EXPOSE 8080
CMD ["java","-jar","/usr/app/backend-0.0.1-SNAPSHOT.jar"]