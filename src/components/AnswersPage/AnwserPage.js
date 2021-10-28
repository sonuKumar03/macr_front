import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Grid, Header, Segment } from 'semantic-ui-react'
import { questionSelector } from '../GameRoom/chapterReducer'
import './Answer.css'
export default function AnserPage() {
    const Questions = useSelector(questionSelector)
    let correct = Questions.filter(q=>q.IsvalidAnswer)?.length;
    let wrong = Questions.filter(q=>!q.IsvalidAnswer)?.length;
    return (
      <Container >
      <Header textAlign="center" dividing size="huge" color="teal" > Answers  </Header>
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

      {Questions.map((q, i) => (
        <Segment raised key={i}>
          <Grid>
            <Grid.Row verticalAlign="middle" color={q.IsvalidAnswer?'green':'red'} >
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
                {q.userResponse?.value}
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
