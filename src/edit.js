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
  componentWillMount() {
    store.subscribe(['questions', 'chapters'])
  }

  render() {
    return <div>
      <h2 className="header">Add Question</h2>
      <Paper style={ppr_style} zDepth={2}>
      <div>
      <TextField onChange={e => this.question = e.target.value} value={this.question} floatingLabelText="Question" fullWidth={true} multiLine={true} rows={4} /><br />
      <TextField onChange={e => this.answer = e.target.value} value={this.answer} floatingLabelText="Answer" fullWidth={true}/><br />
      {this.answer}
      
      <RaisedButton style={sbmt_style} onClick={()=> store.add_question(this.question, this.answer)}>Add Question</RaisedButton>
      </div>
      </Paper>
      questions<br />
      <ul>
        {store.questions.map((q, i) => <li onClick={() => store.remove_question(i)} key={i}>
          {JSON.stringify(q)}
        </li>)}
      </ul>
      <h2 className="header">Add Chapter</h2>
      <Paper style={ppr_style} zDepth={2}>
      <div>
      <TextField onChange={e => this.chapter = e.target.value} value={this.chapter} floatingLabelText="Chapter" fullWidth={true}/><br />
      {this.chapter}
      
      <RaisedButton style={sbmt_style} onClick={()=> store.add_chapter(this.chapter)}>Add Chapter</RaisedButton>
      </div>
      </Paper>
      chapters<br />
      <ul>
        {store.chapters.map((q, i) => <li onClick={() => store.remove_chapter(i)} key={i}>
          {i + ": " + q}
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

