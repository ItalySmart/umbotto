FROM node:16

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /opt/
COPY ./package.json ./
RUN pnpm install

COPY . .

run pnpm build

CMD ["pnpm", "start"]
