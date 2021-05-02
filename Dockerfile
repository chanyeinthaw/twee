FROM node:15.10.0

USER root
WORKDIR /home/app

RUN apt update
RUN apt -y install python3 python3-pip
RUN npm i -g pm2
RUN mv /usr/bin/python /usr/bin/python_old
RUN ln -s /usr/bin/python3 /usr/bin/python

COPY package.json .
RUN yarn install

COPY . .

RUN pip3 install -r telethon/requirements.txt

EXPOSE 3000