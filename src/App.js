import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Form from "./components/Form"

export default function App() {
  return (
    <Router>
      <div>
        <Route exact path="/">
          <Form />
        </Route>
      </div>
    </Router>
  )
}