import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Button, Container, Form, Header, Segment } from "semantic-ui-react";
import { SAVE_ANSWERS } from "../../store/chapter/constants";
import { saveUserResponse } from "../../store/chapter/reducer";
import './Questions.css';
function Question(props) {
  const {chapter,saveUserResponse,global,submitAnswer} = props;
  const {questions=[],userAddress,chapterId} = chapter;
  const {user} = global;
  const [disabled,setDisabled] = useState(true);
  const handleChange = (e,q)=>{
    const {questionId,value} = e;
    const {question} =q;
    saveUserResponse({questionId:question._id,value:e});
  }

  useEffect(()=>{
    let t = questions.every((q)=>q.userResponse!==null)
    setDisabled(!t);
  },[questions])

  const handleSubmit = async()=>{
    submitAnswer({user,chapter});
  }
  return (
    <Container fluid>
    <Form>
      {questions.map((q, i) => (
        <Segment raised key={i}>
          <Header>{q.question.question}</Header>
          <Select  onChange={(e)=>handleChange(e,q)} isSearchable options={q.options} />
        </Segment>
      ))}
    </Form>
      <Link className={disabled?'disable-btn':''}  to="/answers">
        <Button disabled={disabled}  primary onClick={handleSubmit} className="mt-3" >Submit</Button>
      </Link>
    </Container>
  );
}
const mapStateToProps = (state)=>{
  return{
    chapter:state.chapter,
    global:state.global,
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    saveUserResponse:(data)=>dispatch(saveUserResponse(data)),
    submitAnswer:(data)=>dispatch({type:SAVE_ANSWERS,payload:data})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Question);
