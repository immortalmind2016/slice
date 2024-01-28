# How to run, without docker

- postgres must be installed in your machine `We will discuss how to use docker instead`
- `bash npm install `
- `bash npm run start:dev`
- open browser <a href="http://localhost:3000">http://localhost:3000</a>
- `bash npm run fixtures`

# With docker `recommended`

- `bash docker-compose up -d `
- open browser <a href="http://localhost:3000">http://localhost:3000</a>

# System components

### Auth flow

![Alt text](https://i.ibb.co/JQtg8bc/image.png)

### Interceptors

- I'm using transformer interceptor here as it transformers the response to be as you provided at the PDF

  ```json
  {
    "success": true,
    "data": {}
  }
  ```

### Guards

- It's middleware alike so we are using it to decided whether the use is authorized or not based on `req.session`

### Fixtures

- We are using the concept of fixtures as we want to feed our database with some data
- `bash npm run fixtures`
