

# Article-Nest Server
The Article-Nest Server is a backend server built using Node.js, Express, and TypeScript, following the MVC architecture to structure the code in a clean and maintainable way. This server is responsible for handling all the business logic and database interactions for the Article-Nest web application, which allows users to browse, read, and interact with articles.

The server integrates with a MongoDB database using Mongoose for data persistence, making it highly scalable and efficient. It provides RESTful APIs for the client-side (React) to interact with, including features such as article management (CRUD operations), user authentication, and comment management.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URL`

`USER_EMAIL`

`USER_PASS`

`ACCESS_TOKEN_SECRET`

`REFRESH_TOKEN_SECRET`

`CLOUDINARY_CLOUD_NAME`

`CLOUDINARY_API_KEY`

`CLOUDINARY_API_SECRET`

`NODE_ENV`


## Deployment

To deploy this project run

```bash
  npm start
```


## Demo

Demo
https://article-nest-client-in.vercel.app/


## Run Locally

Clone the project

```bash
  git clone https://github.com/FazalAhamed20/ArticleNest-Server.in.git
```

Go to the ArticleNest-Client

```bash
  cd ArticleNest-Server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm  start
```


## Tech Stack

**Server:** Nodejs, Expressjs, MVC Architecture, Typescript




## Feedback

If you have any feedback, please reach out to us at fazalahamed628@gmail.com

