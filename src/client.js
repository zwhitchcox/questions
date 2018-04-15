import './setup.client'
import './style.css'
import React from 'react'
import ReactDOM from 'react-dom'
import {observable} from 'mobx'
import {observer} from "mobx-react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Paper, TextField, RaisedButton} from 'material-ui'

const ppr_style = {
  margin: "2%",
  padding: "2%",
}
const sbmt_style = {
  margin: 12,
  padding: "2px 5px",
}

@observer export default class App extends React.Component {
  @observable question = ''
  @observable answer = ''
  @observable questions = []

  submit = () => {
    const qa = {
      question: this.question,
      answer: this.answer,
    }
    fetch('/questions', {
      headers: new Headers({
        'content-type': 'application/json',
      }),
      method: 'POST',
      body: JSON.stringify(qa)
    })
      .then(res => res.text())
      .then(id => this.questions.push(qa))
      .then(console.log)
  }
  componentWillMount() {
    fetch('/questions')
      .then(res => res.json())
      .then(questions => this.questions = toArray(questions))
      .catch(console.error)
  }

  render() {
    return <MuiThemeProvider>
      <div>
      <h2 id="header">Add Question</h2>
      <Paper style={ppr_style} zDepth={2}>
      <div>
      <TextField onChange={e => this.question = e.target.value} value={this.question} floatingLabelText="Question" fullWidth={true} multiLine={true} rows={4} /><br />
      <TextField onChange={e => this.answer = e.target.value} value={this.answer} floatingLabelText="Answer" fullWidth={true}/><br />
      {this.answer}
      
      <RaisedButton style={sbmt_style} onClick={this.submit}>Add Question</RaisedButton>
      </div>
      </Paper>
      questions<br />
      <ul>
        {this.questions.map(q => <li>{JSON.stringify(q)}</li>)}
      </ul>
      </div>
    </MuiThemeProvider>
  }
}

ReactDOM.render(<App />, document.querySelector('app'))


function toArray(obj) {
  const new_arr = []
  for (const key in obj) {
    new_arr.push(obj[key])
  }
  return new_arr
}
