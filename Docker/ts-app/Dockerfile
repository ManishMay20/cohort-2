FROM node:18.20.5-alpine3.21 as base
#Stage 1: build
FROM base as builder

WORKDIR /home/build

COPY package*.json ./
COPY tsconfig.json .

RUN npm install 

COPY src/ src/

RUN npm run build

# Stage 2: Runner

FROM base as runner

WORKDIR /home/app

COPY --from=builder /home/build/dist dist/
COPY --from=builder /home/build/package*.json ./

RUN npm install --omit=dev

CMD ["npm", "start"]
