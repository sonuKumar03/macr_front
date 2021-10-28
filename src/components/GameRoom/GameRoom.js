import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import Sidebar from '../sidebar/sidebar'
import ThreedViewer from '../ThreedViewer/ThreedViewer'
import { FETCH_CHAPTERS_QUESTIONS } from './constants'
function GameRoom(props) {
  const {match,fetchQuestion} = props;
  const chapterId = match.params.id;
  useEffect(()=>{
    fetchQuestion(chapterId);
  },[chapterId])

    return (
        <Container>
          <div className="m-grid-container">
        <div className="m-sidebar">
          <Sidebar />
        </div>
        <div className="m-content">
          <ThreedViewer />
        </div>
      </div>
        </Container>
    )
}
const mapStateToProps = (state)=>{
  return {
    questions:state.chapter.questions
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    fetchQuestion:(chapterId)=>dispatch({type:FETCH_CHAPTERS_QUESTIONS,payload:chapterId}),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(GameRoom);