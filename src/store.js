import { observable, action, extendObservable } from 'mobx'

export const store = observable({
  route: window.location.pathname,
  maps: [],
  subscribed: observable.map({}),

  subscribe(field) {
    if (Array.isArray(field)) {
      return Promise.all(field.map(this.subscribe))
    }
    if (store.subscribed.get(field)) return
    store.subscribed.set(field, true)
    extendObservable(store, {
      [field]: []
    })
    console.log(store[field])
    store.maps[field] = []
    return fetch(`/db/${field}`)
      .then(res => res.json())
      .then(rows => {
        for (const id in rows) {
          store.maps[field].push(id)
          store[field].push(rows[id])
        }
      })
      .catch(console.error)
  },

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


