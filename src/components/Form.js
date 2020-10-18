import React, {useState, useEffect} from "react";
import * as yup from "yup";
import axios from "axios";
import "./form.css";

//#region form schema
const formSchema = yup.object().shape({
  name: yup
    .string()
    .min(1, "You must enter a name."),
  position: yup
    .string()
    .min(1, "You must pick a role."),
  weapon: yup
    .string()
    .min(1, "You must enter a weapon."),
  skills: yup
    .array()
    .min(1, "You must pick at least one skill."),
  faveInsult: yup
    .string()
    .min(1, "You must enter an insult.")
});
//#endregion

export default function Form(props) {
  const {formState, setFormState} = props; //formState holds user data, passed down from app.js
  const [errorsState, setErrorsState] = useState({}); //form validation lives here, doesn't need to be passed anywhere

  function submit(e) {
    e.preventDefault(); //submit doesn't refresh page every time; bad for react which shouldn't require reloading the entire page
    formSchema.validate(formState, {abortEarly: false}) //abortEarly:false tells yup not to stop at first error so we can get an array of all errors on submit
      .then(valid => {  //if all OK
        setErrorsState({}) //reset errors to none
        axios.post("https://reqres.in/api/users", formState) //submit form data to backend
          .then(res => {
            // go to next page
          })
          .catch(err => console.log(err));
      })
      .catch(err=> { //if errors
        let errors = err.inner;
        let errorsObj = {};
        for (let i in errors) {
          let key = errors[i].params.path;
          errorsObj[key] = errors[i].errors[0]; //put all errors in an obj to mimic errorsState
        }
        setErrorsState(errorsObj); 
    });
  };

  function updateForm(e) {//take user input values and store in formState as obj with event target name as key
    if (e.target.name === "skills") { //checkboxes can have multiple so push values into an array
      setFormState({...formState}, formState[e.target.name].push(e.target.value))
    }
    else {
      setFormState({...formState, [e.target.name]: e.target.value}) 
    }
  }

  return (
    <div className="form-container">
      <header>
        <h1 className="title">SO YOU WANT TO BE A PIRATE</h1>
        <h2 className="academy">The Guybrush Threepwood Academy of Piratical Arts </h2>
        <p className="intro">hereby invites you to join us on a swashbuckling adventure filled with swords, sails and only the foulest of insults.</p>
        <p className="intro">Fill out the application below and get started on your new career as a terror of the high seas!</p>
      </header>

      <form className="form" onSubmit={submit}>
        <div className="input-container">
          <label className="label" htmlFor="name">Name:</label>
          <input className="input"
            type="text"
            name="name"
            placeholder="Dudecomb Twoptimber"
            value={formState.name}
            onChange={updateForm}
          /> 
          {errorsState.name && <p className="error">{errorsState.name}</p>}
        </div>

        <div className="input-container">
          <label className="label" htmlFor="position">Pick a role: </label> 
          <select className="select"
            type="dropdown"
            name="position"
            onChange={updateForm}
          > 
            <option value="">Pick a Role</option> 
            <option value="captain" >Captain</option>
            <option value="cook">Cook</option>
            <option value="first-mate">First Mate</option>
            <option value="cabin-boy">Cabin boy</option>
            <option value="mascot">Mascot</option>
          </select>
          {errorsState.position && <p className="error">{errorsState.position}</p>}
        </div>

        <div className="input-container">
          <label className="label" htmlFor="weapon">Pick a weapon:</label>
          <input className="input"
            type="text"
            name="weapon"
            placeholder="Root beer spritzer"
            value={formState.weapon}
            onChange={updateForm}
          /> 
          {errorsState.weapon && <p className="error">{errorsState.weapon}</p>}
        </div>

        <div className="input-container">
          <p className="bold">Which skills do you want to learn?</p>
          <p className="check-all">(Check all that apply)</p>
          <div className="checkbox-container">
            <label className="check-label" htmlFor="insults">
              <input className="input"
                type="checkbox"
                name="skills"
                value="insults"
                onChange={updateForm}
              />Insult Mastery
            </label>
            <label className="check-label" htmlFor="breath">
              <input className="input"
                type="checkbox"
                name="skills"
                value="breath"
                onChange={updateForm}
              />Breath Holding
            </label>
            <label className="check-label" htmlFor="negotiation">
              <input className="input"
                type="checkbox"
                name="skills"
                value="negotiation"
                onChange={updateForm}
              />Negotiation
            </label>
            <label className="check-label" htmlFor="monkeys">
              <input className="input"
                type="checkbox"
                name="skills"
                value="monkeys"
                onChange={updateForm}
              />Monkey Wrangling
            </label>   
            <label className="check-label" htmlFor="seduction">
              <input className="input"
                type="checkbox"
                name="skills"
                value="seduction"
                onChange={updateForm}
              />The Art of Seduction
            </label>
          </div>
          {errorsState.skills && <p className="error-check">{errorsState.skills}</p>}
        </div>

        <div className="input-container">
          <label className="label" htmlFor="faveInsult">Give us your best insult, you lily-livered chicken.</label>
          <textarea className="textarea"
            name="faveInsult"
            placeholder="You fight like a cow." 
            value={formState.faveInsult} 
            onChange={updateForm} 
          />
          {errorsState.faveInsult && <p className="error">{errorsState.faveInsult}</p>}
        </div>

        <button className="submit-button" type="submit">Submit</button>
      </form>
    </div>
  );
};