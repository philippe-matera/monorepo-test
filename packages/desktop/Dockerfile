FROM node:16-alpine AS build-env

# Create app directory
WORKDIR /usr/src/app

RUN apk add git

# Install app dependencies
COPY package*.json ./
COPY .npmrc .npmrc
ARG NPM_TOKEN
RUN echo "//npm.pkg.github.com/:_authToken=$NPM_TOKEN" >> .npmrc && \
    yarn

# Bundle app source
COPY . .
RUN yarn run build-storybook


FROM nginx:1.21.3-alpine
COPY --from=build-env /usr/src/app/storybook-static /usr/share/nginx/html
COPY ./static /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
