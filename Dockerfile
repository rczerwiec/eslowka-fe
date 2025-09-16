# 1. Etap budowania
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# Build args dla wszystkich Twoich zmiennych
ARG REACT_APP_GEMINI_API_KEY
ARG REACT_APP_apiKey
ARG REACT_APP_authDomain
ARG REACT_APP_projectId
ARG REACT_APP_storageBucket
ARG REACT_APP_messagingSenderId
ARG REACT_APP_appId
ARG REACT_APP_measurementId
ARG REACT_APP_testApiUrl
ARG REACT_APP_prodApiUrl

# Przekazujemy do środowiska podczas builda
ENV REACT_APP_GEMINI_API_KEY=$REACT_APP_GEMINI_API_KEY
ENV REACT_APP_apiKey=$REACT_APP_apiKey
ENV REACT_APP_authDomain=$REACT_APP_authDomain
ENV REACT_APP_projectId=$REACT_APP_projectId
ENV REACT_APP_storageBucket=$REACT_APP_storageBucket
ENV REACT_APP_messagingSenderId=$REACT_APP_messagingSenderId
ENV REACT_APP_appId=$REACT_APP_appId
ENV REACT_APP_measurementId=$REACT_APP_measurementId
ENV REACT_APP_testApiUrl=$REACT_APP_testApiUrl
ENV REACT_APP_prodApiUrl=$REACT_APP_prodApiUrl

RUN npm run build

# 2. Etap serwera
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

