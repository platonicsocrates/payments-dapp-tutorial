# Check if we need to prepend docker commands with sudo
SUDO := $(shell docker version >/dev/null 2>&1 || echo "sudo")

# If LABEL is not provided set default value
LABEL ?= $(shell git rev-parse --short HEAD)$(and $(shell git status -s),-dirty-$(shell id -u -n))
# If TAG is not provided set default value
TAG ?= stellar/soroban-react-payment:$(LABEL)

# Build date for the Docker image
BUILD_DATE := $(shell date -u +%FT%TZ)

# Command to build the Docker image
docker-build:
	$(SUDO) docker build --pull --label org.opencontainers.image.created="$(BUILD_DATE)" -t $(TAG) .

# Command to push the Docker image to a registry
docker-push:
