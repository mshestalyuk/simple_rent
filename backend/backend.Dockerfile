FROM maven:3.8.3-openjdk-17 AS build
RUN groupadd -g 1000 appuser && useradd -u 1000 -g appuser -m -s /bin/bash appuser
WORKDIR /app
RUN chown -R appuser:appuser /app
COPY --chown=appuser:appuser pom.xml .
RUN mvn dependency:go-offline -B
COPY --chown=appuser:appuser src ./src
USER appuser
RUN mvn clean install

FROM openjdk:17-jdk-alpine

RUN apk update && apk upgrade && \
    addgroup -g 1000 appuser && \
    adduser -u 1000 -G appuser -s /bin/sh -D appuser && \
    rm -rf /var/cache/apk/*

WORKDIR /app

COPY --from=build --chown=appuser:appuser /app/target/DeployDemo-0.0.1-SNAPSHOT.jar ./deployDemo.jar

USER appuser

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

CMD ["java", \
     "-XX:+UseContainerSupport", \
     "-XX:MaxRAMPercentage=75.0", \
     "-XX:+ExitOnOutOfMemoryError", \
     "-Djava.security.egd=file:/dev/./urandom", \
     "-jar", "deployDemo.jar"]