# 💸 Bexchange

This is an API that should retrieve the best exchange value between three different sources. Each source behaves in a
different manner:

- Service A: a normal API that should return the exchange value immediately;
- Service B: a delayed API that should return the exchange value a few seconds after the request;
- Service C: an asynchronous API that should deliver the exchange value to a callback.

The idea behind the implementation is to wait for all of the responses before returning anything to the requester/user.
The trick here was to get the response from the callback in runtime - not waiting for the callback response for more
than five seconds.

This challenge was based on [Zanfranceschi's article](https://dev.to/zanfranceschi/desafio-integracao-com-apis-4jco).
You can find more information about it there.

## 🔍 The approach

In order to do the challenge, I've chosen _deno_, _redis_, _oak_ and _fetch_. I always wanted to use deno and I thought
that this would be the perfect opportunity to do so and oak seemed as a good option to use when building my APIs. My
greatest challenge here was to find how I would retrieve the callback response in runtime.

I tried to look for [ZeroMQ](https://zeromq.org/) or some IPC for deno, but I was not able to find anything reliable.
With that being said, I decided to go with Redis, since I could use the `cid` returned field to save the exchange value
in memory and still would be able to recover it in between the 5 seconds time limit. Probably there is a better way to
implement it, but that's what worked for me. :)

## 📝 Files Structure

Here's the explanation about the files from the project:

```
📦src                   - the folder containing all implementation files.
 ┣ 📜consts.ts          - the file were constants are being stored.
 ┣ 📜deps.ts            - the file were dependencies are declared.
 ┣ 📜exchange.ts        - the file were the logic between exchange requests was made.
 ┣ 📜helpers.ts         - the file were helper methods were created in order to be able to do the actual requests.
 ┣ 📜redis.ts           - the file were redis logic was implemented.
 ┗ 📜server.ts          - the file were the API was created and things were glued together.
 🧰 configs.json        - the file were the configuration specificities were created.
 🐋 Dockerfile          - application's dockerization.
 🐋 docker-compose.yml  - the file containing all necessary containers to run the application.
```

## ⚙️ How to run?

In order to run this project, you'll need to execute the following commands:

```bash
git clone git@github.com:devtorello/bexchange.git
cd bexchange
docker-compose up --build
```

Keep in mind that you don't have to have deno installed, but you'll need docker and docker-compose for sure. :)

## 🌐 Endpoints

After executing the following commands, you'll have access to the following endpoints:

### Verify if app is running

This is a endpoint that should exist just for you to check if the application is running already.

```bash
GET http://localhost:8000

curl http://localhost:8000 # if you want to execute it from your terminal
```

### Retrieve Best Exchange

This is the endpoint that should be supposed to return the best exchange between all services. You can request it
through your browser, curl, insomnia and etc.

```bash
GET http://localhost:8000/:currency # the currency can be values as USD, EUR, BRL and so on

curl http://localhost:8000/USD # if you want to execute it from your terminal
```

## 🤪 Disclaimers

I don't like semicolons **at all**. However, since this is a thing on deno, I kept it.
