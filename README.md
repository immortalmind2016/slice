# How to run, without docker

- postgres must be installed in your machine `We will discuss how to use docker instead`
- `npm install`
- ` npm run start:dev`
- open browser <a href="http://localhost:3000">http://localhost:3000</a>
- ` npm run fixtures`

# With docker `recommended`

- `docker-compose up -d`
- open browser <a href="http://localhost:3000">http://localhost:3000</a>

# Test

- We are using mocha to do integration and unit test cases
- `npm run test`

# Architecture

- We are using NestJS framework to build our application
- We are using typeorm as an ORM to connect to postgres
- We are using swagger to document our APIs
- We are using docker to containerize our application
- We are using github actions to run our CI/CD

# Pre commit

- We are using husky to run the linting before committing the code

# CI/CD

- We are using github actions to build the docker image and push it to the registry

# System components

### Data transfer objects (DTOs)

- createUserDto: Responsible for defining the data structure of the user required data

### Interceptors

- I'm using transformer interceptor here as it transformers the response to be as you provided at the PDF

  ```json
  {
    "success": true,
    "data": {}
  }
  ```

### Filter [Custom Exceptions]

- DatabaseError
- SomethingWentWrongError
- requestValidationError

### Guards

- It's middleware alike so we are using it to decided whether the use is authorized or not based on `req.session`

### Fixtures

- We are using the concept of fixtures as we want to feed our database with some data
- `bash npm run fixtures`

### Auth flow

![Alt text](https://i.ibb.co/JQtg8bc/image.png)

# How to use the API

- Just check the swagger documentation at http://localhost:3000/docs

# Conventions

- We are using conventional commits to make our commits more readable and understandable [chore: your message ] prefix maybe [feat,docs,chore,fix]

#### Files [kabab-case]

# Recommendations

- Use docker to run the application.
