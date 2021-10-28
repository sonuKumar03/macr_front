import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Button, Container, Form, Header, Segment } from "semantic-ui-react";
import { saveUserResponse } from "../GameRoom/chapterReducer";
import './Questions.css';

function Question(props) {
  const {saveUserResponse,questions=[]} = props;
  const handleChange = (e,q)=>{
    const {questionId,value} = e;
    saveUserResponse({questionId,value});
  }
  const handleSubmit = ()=>{}
  
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
      <Link   to="/answers">
        <Button  onClick={handleSubmit} className="mt-3" primary>Submit</Button>
      </Link>
    </Container>
  );
}
const mapStateToProps = (state)=>{
  return{
    questions:state.chapter.questions
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    saveUserResponse:(data)=>dispatch(saveUserResponse(data))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Question);
