#!/bin/sh
set -e

echo "Running database migrations..."
npx prisma migrate deploy

if [ "$RUN_SEED" = "true" ]; then
  echo "Running database seed..."
  npm run db:seed
fi

echo "Starting application..."
npm run start:prod
