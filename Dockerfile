# Use the official Node.js 16 LTS image
FROM node:16-alpine

# Set environment variables
ENV APP_DIR=/usr/src/app \
    REPO_OWNER=ArchBTW-LuddyHackathonTeam\
    REPO_NAME=LuddyHackathonFA24 

# Install bash and github cli
RUN apk update && apk add --no-cache bash github-cli curl unzip

# Create and set the working directory inside the container
WORKDIR $APP_DIR

# Defailt build mode argument
ARG MODE=release

RUN if [ "$MODE" = "dev" ]; then \ 
       echo "Cloning latest development version..."; \
       git clone -b ian-docker-update --depth 1 "https://github.com/${REPO_OWNER}/${REPO_NAME}.git"; \
    elif [ "$MODE" = "release" ]; then \
        echo "Downloading latest release..."; \
        release_url=$(curl -s "https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest" | grep "zipball_url" | cut -d '"' -f 4); \
        if [ -z "$release_url" ]; then \
            echo "Failed to fetch release URL"; \
            exit 1; \
        fi; \
        curl -L -o release.zip "$release_url"; \
        unzip -d ${REPO_NAME} release.zip; \
        rm release.zip; \
    else \
        echo "Invalid MODE value: ${MODE}. Use 'dev' or 'release'."; \
        exit 1; \
    fi; \
    echo "Completed app download and unpack."; 

# Change into backend directory
WORKDIR ${APP_DIR}/${REPO_NAME}/backend

# Install app dependencies
RUN npm install

# Build the TypeScript code
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Change into frontend directory
WORKDIR ${APP_DIR}/${REPO_NAME}/frontend

# Install dependencies
RUN npm install

# Build app
RUN npm run build

# Expose port 5173
EXPOSE 5173

WORKDIR ${APP_DIR}/${REPO_NAME}

# TEMP copy start script
COPY start.sh start.sh
RUN chmod +x start.sh

# Command to run your application
CMD ["./start.sh"]
