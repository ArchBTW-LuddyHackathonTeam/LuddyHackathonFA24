# Table of Contents

1. [Contact Point](#contact-point)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Link to OpenAPI Documentation](#link-to-openapi-documentation)
5. [Demo Video](#demo-video)
6. [Installation](#installation)
   1. [Docker-Compose (recommended)](#docker-compose-recommended)
      1. [Default Installation](#default-installation)
      2. [Development Installation](#development-installation)
      2. [Local Installation](#local-installation)
   3. [Manual Installation](#manual-installation)
      1. [Prerequisites](#prerequisites-1)
      2. [Download Source Code](#download-source-code)
      3. [Install Dependencies and start the server](#install-dependencies-and-start-the-server)
7. [Configuration](#configuration)
   1. [Server Address](#server-address)

# Contact Point
**Point of Contact** is a RESTful API service designed to help the employees of SC 1701-D identify a primary point of
contact for a specific product or repository. By simplifying cross-project collaboration, Point of Contact empowers
users to quickly and efficiently location the relevant people for their projects. 

The API is designed with a user-friendly interface and detailed OpenAPI documentation to allow developers to seamlessly
integrate and extend its functionality.

## Features
- A well documented RESTful API via the OpenAPI spec
- Secure session handling via JWT Tokens
- A intuitive frontend friendly to the user designed using ReactJS
- Fuzzy Finding endpoing w/ filters for faster search
- Autheticated users and protected routes
- Containerized backend and frontend server using Docker

## Prerequisites
- NodeJS & NPM (Node Package Manager) (Optional)
- Docker & Docker Compose

# Link to OpenAPI Documentation
https://pizza.lill1e.sh/docs

# Demo Video
For a demonstration of the Point of Contact service, please watch the [demo video](https://youtu.be/wphANwJc7E4?si=XIf9CFRwDr5HpTLW).

# Installation

There are several ways to install Contact Point, choose the best method for your environment.

## Docker-Compose (recommended)

Install and run the server using a docker compose script, ensure that docker and docker-compose are installed on your
system before proceeding.

### Default Installation

The default installation pulls from the latest release on GitHub to build the server.

Instructions:

1. Download `docker-compose.yml` and `Dockerfile` from [the GitHub page](https://github.com/ArchBTW-LuddyHackathonTeam/LuddyHackathonFA24)

        $ wget -O docker-compose.yml https://github.com/ArchBTW-LuddyHackathonTeam/LuddyHackathonFA24/releases/latest/download/docker-compose.yml
        
        $ wget -O Dockerfile https://github.com/ArchBTW-LuddyHackathonTeam/LuddyHackathonFA24/releases/latest/download/Dockerfile

1. Run the following command:

        $ docker-compose up

2. Ensure that the container was built and started without any errors

You should now be able to access the web app at [localhost:5173](localhost:5173).

### Development Installation

The development installation will pull the latest commit on GitHub to build the server.

WARNING: the development version may not be stable, if you are deploying this project, we recommend using the latest
release version

Instructions:

1. Download `docker-compose.dev.yml` and `Dockerfile` from [the GitHub page](https://github.com/ArchBTW-LuddyHackathonTeam/LuddyHackathonFA24)

        $ wget -O docker-compose.yml https://github.com/ArchBTW-LuddyHackathonTeam/LuddyHackathonFA24/releases/latest/download/docker-compose.dev.yml

        $ get -O Dockerfile https://github.com/ArchBTW-LuddyHackathonTeam/LuddyHackathonFA24/releases/latest/download/Dockerfile

2. Start docker-compose

        $ docker-compose up

3. Ensure that the container was built and started without any errors

You should now be able to access the web app at [localhost:5173](localhost:5173).

### Local Installation

The local installation will build the server from a local copy of the GitHub, allowing you to test your own changes.

1. Clone the GitHub repo to a folder of your choice

        $ git clone https://github.com/ArchBTW-LuddyHackathonTeam/LuddyHackathonFA24

2. Move into the repository root directory

        $ cd LuddyHackathonFA24

3. Rename `docker-compose.local.yml` to `docker-compose.yml`
        
        $ mv docker-compose.local.yml docker-compose.yml

4. Ensure that the container was built and started without any errors

You should now be able to access the web app at [localhost:5173](localhost:5173).

If you make any changes to the database structure, want to reload the database with new sample data, or remove the
sample data entirely, make your changes to the `.sql` files, stop the container with `docker-compose down -v`, and
restart the container.

## Manual Installation

Build and start the server on your local system, this will require you to install several components such as Node.js
and PostgreSQL

### Prerequisites

- PostgreSQL

    1. Install PostgreSQL, downloads can be found [here](https://www.postgresql.org/download/)

    2. Configure Postgres for your system, instructions will differ for each system, if you are unsure what to do, look
    up instructions for your operating system

    3. Create a database for your server, this can be under any user you choose, but keep in mind that it is best
    practice to create a new user for each project

- Node.js

    - Install Node.js, it is recommended to use version 23, your milage may vary with other versions, installation
    instructions can be found [here](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)

### Download Source Code

You can choose to download either the release or development version of the project, depending on your needs.

- Release

    1. Navigate to the releases page of the [GitHub repository](https://github.com/ArchBTW-LuddyHackathonTeam/LuddyHackathonFA24/releases)

    2. Download an archive from either the latest release (recommended) or a previous release

        - NOTE: If you use a past release, these instructions may not apply, please refer to the README included in
        that release

    3. Extract the source code into a directory of your choosing

- Development

    - WARNING: The development verion may be unstable, if you are deploying this project, we recommend using the
    latest release version
    
    - Clone the repository using the following command:

            $ git clone https://github.com/ArchBTW-LuddyHackathonTeam/LuddyHackathonFA24/releases

### Install Dependencies and start the server

1. Move into the backend directory

        $ cd /path/to/repo/backend

2. Set environment variables for your postgres database, an example .env is provided below:

        # Only change the database host if your database is hosted externally
        #DATABASE_HOST=localhost
        # Only change the database port if you have changed it on your installation
        #DATABASE_PORT=5432
        DATABASE_USER=your_user # Replace this with the postgres user in charge of your database
        DATABASE_PASSWORD=your_password # Replace this with the password for the above user
        DATABASE_NAME=your_database_name # Replace this with the name of the database you set earlier

2. Install node dependencies

        $ npm i

3. Build the server

        $ npm run build

4. Start the server 
    
        $ npm run start

5. Move into the frontend directory

        $ cd /path/to/repo/frontend

6. Install node dependencies

        $ npm i

7. Build the server

        $ npm run build

8. Start the server

        $ npm run dev

Your server should now be up, the api is accesable via port 3000, and the web app is accessable via port 5173

# Configuration

## Server Address

By defailt, the server will only be accessible from `localhost`, to change this, you may set the `FRONTEND_ORIGIN`
environment variable.

Example .env:

        FRONTEND_ORIGIN=your-sub-domain.your-domain.com
