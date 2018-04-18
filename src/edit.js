import React from 'react'
import ReactDOM from 'react-dom'
import {observable} from 'mobx'
import {observer} from "mobx-react"
import {Paper, TextField, RaisedButton} from 'material-ui'
import { store } from './store'

const ppr_style = {
  margin: "2%",
  padding: "2%",
}
const sbmt_style = {
  margin: 12,
  padding: "2px 5px",
}

@observer export default class Edit extends React.Component {
  @observable question = ''
  @observable answer = ''

  render() {
    return <div>
      <h2 id="header">Add Question</h2>
      <Paper style={ppr_style} zDepth={2}>
      <div>
      <TextField onChange={e => this.question = e.target.value} value={this.question} floatingLabelText="Question" fullWidth={true} multiLine={true} rows={4} /><br />
      <TextField onChange={e => this.answer = e.target.value} value={this.answer} floatingLabelText="Answer" fullWidth={true}/><br />
      {this.answer}
      
      <RaisedButton style={sbmt_style} onClick={()=> store.add(this.question, this.answer)}>Add Question</RaisedButton>
      </div>
      </Paper>
      questions<br />
      <ul>
        {store.questions.map((q, i) => <li onClick={() => store.remove(i)} key={i}>
          {JSON.stringify(q)}
        </li>)}
      </ul>
      </div>
  }
}

function toArray(obj) {
  const new_arr = []
  for (const key in obj) {
    new_arr.push(obj[key])
  }
  return new_arr
}
