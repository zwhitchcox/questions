import { observable, action } from 'mobx'

export const store = observable({
  route: window.location.pathname,
  questions_map: [],
  questions: [],

  add(question, answer) {
    const qa = {
      question,
      answer,
    }
    fetch('/db/questions', {
      headers: new Headers({
        'content-type': 'application/json',
      }),
      method: 'POST',
      body: JSON.stringify(qa)
    })
      .then(res => res.text())
      .then(id => this.questions.push(qa))
      .then(console.log)
  }, 
  remove(i) {
    const key = this.questions_map[i]
    fetch('/db/questions/' + key, {
      headers: new Headers({
        'content-type': 'application/json',
      }),
      method: 'DELETE',
    })
    this.questions_map.splice(i, 1)
    this.questions.splice(i, 1)
  }
})


fetch('/questions')
  .then(res => res.json())
  .then(questions => {
    const new_arr = []
    for (const id in questions) {
      store.questions_map.push(id)
      new_arr.push(questions[id])
    }
    store.questions = new_arr
  })
  .catch(console.error)
