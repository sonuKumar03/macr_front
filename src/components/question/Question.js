import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Button, Container, Form, Header, Segment } from "semantic-ui-react";
import { SAVE_ANSWERS } from "../../store/chapter/constants";
import { saveUserResponse } from "../../store/chapter/reducer";
import { abi, tokenContractAddress,client_token, tokens} from "../Data";
import './Questions.css';
import Web3 from 'web3';

function Question(props) {
  const {chapter,saveUserResponse,global,submitAnswer,chapters} = props;
  const {questions=[],chapterId} = chapter;
  const {user} = global;
  const [disabled,setDisabled] = useState(true);
  // const currentChapter = chapters.find((ch)=>ch.chapter_id===chapter.chapter);
  const curChapter = chapters.find((ch)=>ch.chapter._id===chapter.chapter);
  const token = curChapter.chapter.token;
  const owned = curChapter.owned;
  console.log(owned);
  const {userAddress} = user;
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
    const web3 = new Web3(Web3.givenProvider);
    const contract = new web3.eth.Contract(abi,tokenContractAddress);
    if(owned===false){
      const result1 = await contract.methods.setApprovalForAll(tokenContractAddress,true).send({from:userAddress});
      const result2 = await contract.methods.safeTransferFrom(userAddress,client_token,token,1,0).call();
    }
    submitAnswer({user,chapter});
    props.history.push("/answers");
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
      <Link className={disabled?'disable-btn':''}  to="#">
        <Button disabled={disabled}  primary onClick={handleSubmit} className="mt-3" >Submit</Button>
      </Link>
    </Container>
  );
}
const mapStateToProps = (state)=>{
  return{
    chapter:state.chapter,
    global:state.global,
    chapters:state.chapters
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    saveUserResponse:(data)=>dispatch(saveUserResponse(data)),
    submitAnswer:(data)=>dispatch({type:SAVE_ANSWERS,payload:data})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Question);
