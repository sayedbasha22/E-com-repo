# -------- Build stage --------
FROM maven:3.9.9-amazoncorretto-21 AS builder
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# -------- Runtime stage --------
FROM amazoncorretto:21
WORKDIR /app
COPY --from=builder /build/target/product-service-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","app.jar"]

