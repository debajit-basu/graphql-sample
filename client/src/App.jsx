import { useState, useEffect } from "react";
import "./App.css";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  query ExampleQuery {
    getTodos {
      id
      title
      completed
      user {
        id
        name
        email
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(query);
  console.log({ loading, error, data });
  if (loading)
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        Loading.......
      </div>
    );
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>Graphql example</h2>
      </div>
    </>
  );
}

export default App;
