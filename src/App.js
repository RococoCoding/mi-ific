import React, {useState} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Form from "./components/Form"
import Page from "./components/Page"


export default function App(props) {
  const [bg, setBg] = useState("")
  const [formState, setFormState] = useState({
    name: "",
    position: "",
    weapon: "",
    skills: [],
    faveInsult: ""
  });

  return (
    <Router>
      <div>
        <Route exact path="/">
          <Form
            formState={formState}
            setFormState={setFormState}
          />
        </Route>
        <Route path="/page1">
          <Page 
            bg={bg}
          />
        </Route>
      </div>
    </Router>
  )
}