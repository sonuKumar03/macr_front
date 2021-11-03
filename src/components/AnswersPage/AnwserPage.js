import React from 'react'
import { connect } from 'react-redux'
import { Container, Grid, Header, Segment } from 'semantic-ui-react'
import './Answer.css'
function AnserPage(props) {
    const {answers }= props;

    let correct = answers.filter(q=>q.correct)?.length;
    let wrong =answers.filter(q=>!q.correct)?.length;

    return (
      <Container style={{marginTop:'2.5rem'}} >
      <Header  dividing size="huge" color="teal" > Answers  </Header>
      <Grid>
        <Grid.Row>
            <Grid.Column width="2">
                <Header sub> Correct :{ correct} </Header>
            </Grid.Column>
            <Grid.Column width="2">
                <Header sub> Wrong :{ wrong} </Header>
            </Grid.Column>
        </Grid.Row>
        </Grid>

      {answers.map((q, i) => (
        <Segment raised key={i}>
          <Grid>
            <Grid.Row verticalAlign="middle" color={q.correct?'green':'red'} >
              <Grid.Column width="3" stretched>
                  Question :
              </Grid.Column>
              <Grid.Column width="11">
                {q.question}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row verticalAlign="middle" >
              <Grid.Column width="3">
                  Your Response :
              </Grid.Column>
              <Grid.Column width="11">
                {q.userResponse}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row verticalAlign="middle" >
              <Grid.Column width="3">
                  Answer :
              </Grid.Column>
              <Grid.Column width="11">
                {q.answer}
              </Grid.Column>
            </Grid.Row>
          </Grid>
          </Segment>
      ))}
        </Container>
    )
}

const mapStateToProps = (state)=>{
  return {
    questions:state.chapter.questions,
    answers:state.answers
  }
}


export default connect(mapStateToProps,null)(AnserPage)
