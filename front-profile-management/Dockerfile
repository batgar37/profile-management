# stage 1
FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: ###
FROM nginx:1.17.1-alpine
COPY --from=build /usr/src/app/dist/front-profile-management /usr/share/nginx/html
EXPOSE 80