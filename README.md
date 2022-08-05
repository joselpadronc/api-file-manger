## Description

API REST with nest.js for managing files stored in AWS S3 and connected with a small sqlite database

## Installation

```bash
$ npm install
```

## Set Environment Variables

- Create file with name ``` .env ```
- Add the following content
```
  S3_Key=<Write here your S3 key>
  S3_SECRET=<Write here your S3 secret>
  S3_BUCKET=<Write here your S3 bucket name>

  JWT_KEY=secret
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
