FROM node:14-alpine as build
WORKDIR /usr/local/app
COPY ./package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.21
COPY --from=build /usr/local/app/dist/hello-world/ /usr/share/nginx/html/
EXPOSE 80