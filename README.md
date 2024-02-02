<h1 align="center">Welcome to Furniture EC</h1>

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Running the app](#running-the-app)
- [License](#license)

## Overview

さまざまな家具を取り揃えた EC の Backend API Server

[Nest](https://github.com/nestjs/nest) + TypeScript + Prisma + Swagger

## Installation

```bash
$ git clone https://github.com/Leopard0505/furniture-ec-api.git
$ cd furniture-ec-api
$ npm install
$ cp .env.sample .env.development
```

## Running the app

```bash
# Nest立ち上げ
# Swagger上で確認する
# http://localhost:3000/api#/
$ npm run start

# マイグレーション
$ npm run migrate:dev

# データ投入
$ npm run seed:dev

# データブラウザ立ち上げ
# http://localhost:5555/
$ npm run studio:dev
```

## License

This software is released under the MIT License, see LICENSE.txt.
