# build
FROM node:22-alpine as build
WORKDIR /code
COPY ["package.json", "package-lock.json*", "./"]
COPY tsconfig.json ./tsconfig.json
COPY src/ /code/src
RUN npm install && npm run build

# production
FROM public.ecr.aws/lambda/nodejs:22
WORKDIR /var/task
COPY --from=build /code/build /var/task/src
COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci --omit=dev

CMD ["src/index.handler"]
