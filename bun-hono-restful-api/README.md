# API Documentation

## Overview

This project is an API developed using [Bun](https://bun.sh/). Follow the steps below to install dependencies, run the server, and test the API using Postman.

## Library

- <strong>Hono</strong> for RestfulAPI
- <strong>Zod</strong> for Validation
- <strong>Winston</strong> for Logger
- <strong>Prisma</strong> for ORM

---

### Postman Documentation

<strong>LINK</strong>: https://documenter.getpostman.com/view/23670076/2sAYBVgrJb

---

### To install dependencies:

```sh
bun install
```

### To run:

```sh
bun run dev
open http://localhost:3000
```

### Build to binary

```sh
bun build src/index.ts --compile --outfile <file_name>
```
