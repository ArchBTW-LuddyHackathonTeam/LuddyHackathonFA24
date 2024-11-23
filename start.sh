#!/bin/bash

cd backend

./wait-for-it.sh db:5432 -- npm run start

cd ..
cd frontend

npm run dev &

wait
