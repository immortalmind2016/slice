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
-
- Check postman collection at ./postman-collection

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
- Run unit test once we have a pull request

# Authentication

- In this part, We are using cookie-session based, So look at the following steps.

1. create jwt token
2. assign this jwt token inside the cookie-session
3. Store in our postgres database inside a table called session

Note: look at the suggestion part at the end of this document.

# Our git flow

- We have 3 branches develop,staging and main
- We should do the following step in order to implement a new feature:
  1. create a branch with feature name
  2. make a pr on develop
  3. merge it using sqash&merge
  4. create a pr from develop to staging then merge it
  5. create a pr from staging to main then merge it

Read more: A feature-based development workflow

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

### Custom Decorators

- `@Auth()` to check if the user authenticated to do the next action or not

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

# Suggestions

- We can use bearer based authentication method instead of cookies,
  So we don't have to worry about how to store these sessions in the backend side.
  Instead the frontend side will manage how to store this token (e.g. localStorage)

# What next?

- Using a service to monitor the unhandled errors (e.g. sentry)
- Stream our logs to elastic search with kibana so we enhance the observability
- Adding more logs
- Config kubernetes deployment files so we can spin up multiple pods from our dockarized app
