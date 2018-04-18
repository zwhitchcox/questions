import React from 'react'
import ReactDOM from 'react-dom'
import {observable} from 'mobx'
import {observer} from "mobx-react"
import {Link} from './link'

@observer export default class Home extends React.Component {

  render() {
    return <div>
      <h1>Home</h1>
      <Link href="/edit">Edit</Link><br />
      <Link href="/quiz">Quiz</Link>
    </div>
  }
}
