FROM node:14.18.1


WORKDIR /app-training

COPY back-end .

RUN yarn

CMD yarn start

EXPOSE 8000