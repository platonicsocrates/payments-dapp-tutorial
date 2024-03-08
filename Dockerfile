# We start with a base image of Ubuntu 20.04 and name it 'build'
FROM ubuntu:20.04 as build

# Adding a label to specify the maintainer of this Dockerfile
LABEL maintainer="SDF Ops Team <ops@stellar.org>"

# Creating a directory called 'app' inside the container and setting it as the working directory
RUN mkdir -p /app
WORKDIR /app

# Setting the environment variable to avoid interactive prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Installing necessary packages for building the application
RUN apt-get update && apt-get install --no-install-recommends -y gpg curl git make ca-certificates apt-transport-https && \
    curl -sSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key|gpg --dearmor >/etc/apt/trusted.gpg.d/nodesource-key.gpg && \
