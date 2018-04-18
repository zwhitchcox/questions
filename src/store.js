import { observable, action } from 'mobx'

export const store = observable({
  route: window.location.pathname,
  chapter: [],
  questions: [],
  chapters: [],

  add_question(question, answer) {
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

  remove_question(i) {
    const key = this.questions_map[i]
    fetch('/db/questions/' + key, {
      headers: new Headers({
        'content-type': 'application/json',
      }),
      method: 'DELETE',
    })
    this.questions_map.splice(i, 1)
    this.questions.splice(i, 1)
  },

  add_chapter(chapter) {
    fetch('/db/chapters', {
      headers: new Headers({
        'content-type': 'application/json',
      }),
      method: 'POST',
      body: chapter
    })
      .then(res => res.text())
      .then(id => this.chapters.push(chapter))
      .then(console.log)
  },

  remove_chapter(i) {
    fetch('/db/chapters/' + key, {
      headers: new Headers({
        'content-type': 'application/json',
      }),
      method: 'DELETE',
    })
  },
})


fetch('/db/questions')
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

fetch('/db/chapters')
  .then(res => res.json())
  .then(chapters => {
    store.chapters
  })
  .catch(console.error)
