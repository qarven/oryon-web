FROM node:24-slim AS build
WORKDIR /app
ENV HUSKY=0
ENV PRERENDER=false
RUN corepack enable
COPY mono/gen/ts ./mono/gen/ts
COPY package.json .
RUN pnpm install
COPY . .
ARG VITE_APP_TITLE
ARG VITE_SITE_URL
ARG VITE_APP_TURNSTILE_SITE_KEY
RUN pnpm build

FROM gcr.io/distroless/nodejs24-debian13:nonroot
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=build /app/.output ./.output
EXPOSE 3000
CMD [".output/server/index.mjs"]
