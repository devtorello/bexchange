FROM denoland/deno:latest

EXPOSE 8000

WORKDIR /app

USER deno

COPY src/deps.ts .
RUN deno cache deps.ts

ADD src .

RUN deno cache server.ts

RUN deno lint

CMD ["run", "--allow-net", "server.ts"]