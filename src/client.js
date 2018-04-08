import React from 'react'
import ReactDom from 'react-dom'

export default class App extends React.Component {
  render() {
    return <h1>Hello, world</h1>
  }
}

ReactDom.render(<App />, document.querySelector('app'))
