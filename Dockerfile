FROM node:21-alpine3.17 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -D typescript
ENV VITE_SERVER_API=http://127.0.0.1/store/api
# http://aa263ceaeb6dd45418b20af642b0e53e-586295319.eu-central-1.elb.amazonaws.com/store/api
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# this line copy the configurations to the nginx so it will be able to inject the app env from the global window object.
# COPY --from=builder /app/src/templates /etc/nginx/templates

EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]