# We start with a base image of Ubuntu 20.04 and name it 'build'
FROM ubuntu:20.04 as build

# Adding a label to specify the maintainer of this Dockerfile
LABEL maintainer="SDF Ops Team <ops@stellar.org>"

# Creating a directory called 'app' inside the container and setting it as the working directory
RUN mkdir -p /app
WORKDIR /app

# Setting the environment variable to avoid interactive prompts during package installation
