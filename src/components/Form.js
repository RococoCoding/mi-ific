import React, {useState, useEffect} from "react";
import styled from "styled-components";
import * as yup from "yup";
import axios from "axios";

const StyleForm = styled.form`
  width: 75%;
  margin: 1% auto;
  border: 1px solid black;
`
const Bg = styled.img`
  z-index: -1;
  width: 25%;
  position: fixed;
  opacity: 0.6;
  top: 40%;
  left: 40%;
`

const PageContainer = styled.div`
  height: 100vh;
  font-size: 1.8rem;
  padding: 2%;
  text-align: center;
  background-color: rgba(207, 178, 83, 0.7);
`
const InputContainer = styled.div`
  margin-bottom: 1%;
`
const InputContainerLast = styled.div`
  margin-top: 2%;
  margin-bottom: 1%;
`
const Title = styled.h1`
  font-size: 4rem;
  font-family: 'Crimson Text', serif;
  margin-bottom: 1%;
`
const Academy = styled.h2`
  font-size: 3.5rem;
  font-family: 'Tangerine', cursive;
`

const Intro = styled.p`
  font-family: 'Libre Baskerville', serif;
  text-align: center;
  line-height: 2.3rem;
`

const Bold = styled.p`
  font-weight: bold;
  font-size: 2rem;
`

const Label = styled.label`
 font-weight: bold;
 font-size: 2rem;
`
const Input = styled.input`
  margin: 1%;
  background-color: white;
`

const Select = styled.select`
`
const TextArea = styled.textarea`
  display: block;
  margin: 0 auto;
  width: 50%;
`

const CheckLabel = styled.label`
  margin: 0 1%;
`

const CheckAll = styled.p`
  margin-bottom: .8%;
`
const Error = styled.p`
  color: red;
  font-weight: bold;
`
const Button = styled.button`
  margin-bottom: 1%;
`

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

export default function Form(props) {
  const [formState, setFormState] = useState({
    name: "",
    position: "",
    weapon: "",
    skills: [],
    faveInsult: ""
  });

  const [errorsState, setErrorsState] = useState({});

  function submit(e) {
    e.preventDefault();
    formSchema.validate(formState, {abortEarly: false})
      .then(value=>setErrorsState({}))
      .catch(err=> {
        let errors = err.inner;
        let errorsObj = {};
        for (let i in errors) {
          let key = errors[i].params.path;
          errorsObj[key] = errors[i].errors[0];
        }
        setErrorsState(errorsObj);
    });
    formSchema.isValid(formState)
      .then(valid=> {
        axios.post("https://reqres.in/api/users", formState) //submit form data to url
        .then(res => console.log(res))
        .catch(err => console.log(err));
    })
  }

  function updateForm(e) {
    if (e.target.name === "skills") {
      setFormState({...formState}, formState[e.target.name].push(e.target.value))
    }
    else {
      setFormState({...formState, [e.target.name]: e.target.value})
    }
  }

  return (
    <PageContainer>
      <Bg src="assets/galleon.png"></Bg>
      <header>
        <Title>SO YOU WANT TO BE A PIRATE</Title>
        <Academy>The Guybrush Threepwood Academy of Piratical Arts </Academy>
        <Intro>hereby invites you to join us on a swashbuckling adventure filled with swords, sails and only the foulest of insults.</Intro>
      </header>

      <StyleForm onSubmit={submit}>
        <InputContainer>
          <Label htmlFor="name">Name:</Label>
          <Input 
            type="text"
            name="name"
            placeholder="Dudecomb Twoptimber"
            value={formState.name}
            onChange={updateForm}
          /> 
          {errorsState.name && <Error>{errorsState.name}</Error>}
        </InputContainer>

        <InputContainer>
          <Label htmlFor="position">Choose your position:</Label> 
          <Select
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
          </Select>
          {errorsState.position && <Error>{errorsState.position}</Error>}
        </InputContainer>

        <InputContainer>
          <Label htmlFor="weapon">Choose your weapon:</Label>
          <Input 
            type="text"
            name="weapon"
            placeholder="Root beer spritzer"
            value={formState.weapon}
            onChange={updateForm}
          /> 
          {errorsState.weapon && <Error>{errorsState.weapon}</Error>}
        </InputContainer>

        <InputContainer>
          <Bold>Which skills do you want to learn?</Bold>
          <CheckAll>(Check all that apply)</CheckAll>
          <CheckLabel htmlFor="insults">
            <input 
              type="checkbox"
              name="skills"
              value="insults"
              onChange={updateForm}
            />Insult Mastery
          </CheckLabel>
          <CheckLabel htmlFor="breath">
            <input 
              type="checkbox"
              name="skills"
              value="breath"
              onChange={updateForm}
            />Breath Holding
          </CheckLabel>
          <CheckLabel htmlFor="negotiation">
            <input 
              type="checkbox"
              name="skills"
              value="negotiation"
              onChange={updateForm}
            />Negotiation
          </CheckLabel>
          <br></br>
          <CheckLabel htmlFor="monkeys">
            <input 
              type="checkbox"
              name="skills"
              value="monkeys"
              onChange={updateForm}
            />Monkey Wrangling
          </CheckLabel>        
          <CheckLabel htmlFor="seduction">
            <input 
              type="checkbox"
              name="skills"
              value="seduction"
              onChange={updateForm}
            />The Art of Seduction
          </CheckLabel>
          {errorsState.skills && <Error>{errorsState.skills}</Error>}
        </InputContainer>

        <InputContainerLast>
          <Label htmlFor="faveInsult">Give us your best insult, you lily-livered chicken.</Label>
          <TextArea 
            name="faveInsult"
            placeholder="You fight like a cow." 
            value={formState.faveInsult} 
            onChange={updateForm} 
          />
          {errorsState.faveInsult && <Error>{errorsState.faveInsult}</Error>}
        </InputContainerLast>

        <Button type="submit">Submit</Button>
      </StyleForm>
    </PageContainer>
  );
};