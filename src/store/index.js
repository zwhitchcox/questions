import { observable, action, extendObservable, observe, transaction, toJS } from 'mobx'

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
    store.maps[field] = []
    return fetch(`/db/${field}`)
      .then(res => res.json())
      .then(rows => {
        transaction(() => {
          for (const id in rows) {
            store.maps[field].push(id)
            store[field].push(rows[id])
          }
        })
        observe(store[field], mirror(field))
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

})

export function mirror(field){
  return event => {
    event.added.forEach(add(field))
  }
}
export function add(field) {
  return value => {
    fetch(`/db/${field}`, {
      headers: new Headers({
        'content-type': 'application/json',
      }),
      method: 'POST',
      body: (value === Object(value)) ? JSON.stringify(value) : value,
    })
  }
}

export function remove(i) {
  fetch('/db/chapters/' + key, {
    headers: new Headers({
      'content-type': 'application/json',
    }),
    method: 'DELETE',
  })
}
