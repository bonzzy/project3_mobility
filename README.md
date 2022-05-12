## Description

### Api requirements:

A user should be able to:
- Do CRUD actions for folders, subfolders and files
- Search files by their exact name within a parent folder or across all folders
List the top 10 files that start with a search string.
This will be used in the search box to show possible matches when the user is
typing. Only “start with” logic is required.

## Installation

```bash
$ npm install
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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## How to use the filesystem API

> Assumption is that the API is running on `http://localhost/3000`

### Test if the API is up and running
```
curl --location --request GET 'http://localhost:3000/healthz'
```

### Create a new folder in root
```
curl --location --request POST 'http://localhost:3000/folder' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Folder Name"
}'
```
> CRUD operations are available for the `/folder` endpoint (POST, GET, PUT, DELETE)

### Find folders by query
```
curl --location --request GET 'http://localhost:3000/folder/find?parentFolderId=2fc85585-a1f7-4138-b867-fd70c0234433&name=Folder Name'
```

### Create a new file in the created folder
```
curl --location --request POST 'http://localhost:3000/file' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "File",
    "parentFolderId": "d0b16064-db18-4969-8a12-433d25a6ce14",
    "content": "this is the content of a file"
}'
```
> CRUD operations are available for the `/file` endpoint (POST, GET, PUT, DELETE)

### Find files by query

```
curl --location --request GET 'http://localhost:3000/file/find?name=File&parentFolderId=f4b958c2-d0ab-4db2-a0dd-fb920a14b3c5&limit=2'
```

### Find files by query and where name starts with *
```
curl --location --request GET 'http://localhost:3000/file/find/starts-with/?parentFolderId=8e691f14-1f80-4262-8071-db4847ae082d&name=Fi'
```