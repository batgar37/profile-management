# Use official JDK image as the base image
FROM openjdk:21-jdk-oracle

# Copy jar in image
ADD target/profilemanagement-0.0.1-SNAPSHOT.jar spring-app.jar

# Execute the jar when the image run
ENTRYPOINT ["java","-jar","/spring-app.jar"]
