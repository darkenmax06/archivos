FROM node:18

RUN mkdir -p /home/app

WORKDIR /home/app

COPY . .

EXPOSE 3000

CMD [ "npm","start" ]