FROM node:20-alpine

WORKDIR /app

COPY package.json ./
# If you have a lockfile, prefer deterministic installs.
# This Dockerfile is written to work even when package-lock.json is absent.
RUN npm install

COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
