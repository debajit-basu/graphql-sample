const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
    type Users {
      id: ID!,
      name: String
      username: String
      email: String
      phone: String
      website: String
    }
    type Todo {
        id: ID!
        title: String!
        completed: Boolean
        user: Users
    }
    
    type Query {
        getTodos: [Todo]
        getUsers: [Users]
        getSingleUser(id: ID!): Users
    }
    `,
    resolvers: {
      Todo: {
        user: async (todo) => {
          let response = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${todo.id}`
          );
          // console.log("****", response);
          return response.data;
        },
      },
      Query: {
        // getTodos: () => [
        //   { id: 1, title: "example test one title", completed: false },
        // ],
        getTodos: async () => {
          let response = await axios.get(
            "https://jsonplaceholder.typicode.com/todos"
          );
          return response.data;
        },
        getUsers: async () => {
          let response = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
          );
          return response.data;
        },
        getSingleUser: async (parent, { id }) => {
          console.log("parent: --", parent);
          let response = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${id}`
          );
          // console.log("****", response);
          return response.data;
        },
      },
    },
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(8000, () => console.log("server started at PORT 8000"));
}

startServer();
