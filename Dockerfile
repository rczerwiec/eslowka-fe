# Etap budowania
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etap serwowania
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Można dodać własny nginx.conf jak chcesz lepszą kontrolę
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]