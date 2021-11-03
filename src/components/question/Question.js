import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Button, Container, Form, Header, Segment } from "semantic-ui-react";
import { SUBMIT_ANSWER } from '../AnswersPage/constants';
import { saveUserResponse } from "../GameRoom/chapterReducer";
import './Questions.css';
function Question(props) {
  const {saveUserResponse,questions=[],submitAnswer,userAddress,chapterId} = props;
  const [disabled,setDisabled] = useState(true);
  const handleChange = (e,q)=>{
    const {questionId,value} = e;
    saveUserResponse({questionId,value:e});
  }

  useEffect(()=>{
    let t = questions.every((q)=>q.userResponse!==null)
    setDisabled(!t);
  },[questions])

  const handleSubmit = async()=>{
    submitAnswer({questions,chapterId,userAddress});
  }
  return (
    <Container fluid>
    <Form>
      {questions.map((q, i) => (
        <Segment raised key={i}>
          <Header>{q.label}</Header>
          <Select value={q.userResponse} onChange={(e)=>handleChange(e,q)} isSearchable options={q.options} />
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
    questions:state.chapter.questions,
    userAddress:state.user,
    chapterId:state.chapter.id
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    saveUserResponse:(data)=>dispatch(saveUserResponse(data)),
    submitAnswer:(data)=>dispatch({type:SUBMIT_ANSWER,payload:data})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Question);
