#!/usr/bin/env bash

cd backend

echo "Starting backend..."

./wait-for-it.sh db:5432 -t 0 -- npm run start &

cd ..
cd frontend

echo "Starting frontend..."

npm run dev &

wait
