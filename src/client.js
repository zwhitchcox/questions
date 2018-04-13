import './setup.client'
import './style.css'
import React from 'react'
import ReactDOM from 'react-dom'
import {observable} from 'mobx'
import {observer} from "mobx-react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper';

const ppr_style = {
  margin: "2%",
  padding: "2%",
}

@observer export default class App extends React.Component {
  @observable question = ''
  @observable answer = ''
  render() {
    return <MuiThemeProvider>
      <div>
      <h1>Questions</h1>
      <Paper style={ppr_style} zDepth={2}>
      <div>
        question: <textarea onChange={e => this.question = e.target.value} value={this.question} /><br />
      answer: <textarea onChange={e => this.answer = e.target.value} value={this.answer} /><br />
      preview: {this.question}<br />
      {this.answer}

      </div>
      </Paper>
      </div>
    </MuiThemeProvider>
  }
}

ReactDOM.render(<App />, document.querySelector('app'))
