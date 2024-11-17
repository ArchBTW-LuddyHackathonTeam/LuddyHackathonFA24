# Contact Point
**Point of Contact** is a RESTful API service designed to help the employees of SC 1701-D identify a primary point of
contact for a specific product or repository. By simplifying cross-project collaboration, Point of Contact empowers
users to quickly and efficiently location the relevant people for their projects. \\
The API is designed with a user-friendly interface and detailed OpenAPI documentation to allow developers to seamlessly
integrate and extend its functionality.

## Features
- A well documented RESTful API via the OpenAPI spec
- Secure session handling via JWT Tokens
- A intuitive frontend friendly to the user designed using ReactJS
- Fuzzy Finding endpoing w/ filters for faster search
- Autheticated users and protected routes
- Containerized backend server using Docker

## Prerequisites
- NodeJS & NPM (Node Package Manager)
- Docker & Docker Compose

## Usage (Web App) Front End
1. **Install the required NPM packages for this to work properly**
   ```sh
   cd frontend
   npm install
   ```
2. **Start the server for running the Web App**
   ```sh
   npm run dev
   ```
3. **The Web App should be accessible via port 5173**

## Usage (API) Back End
1. **Build & Start the Docker Container for the API**
   ```sh
   cd backend
   docker-compose up --build
   ```
2. **The API should be accessible via port 3000**