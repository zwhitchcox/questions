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
})

export function mirror(field){
  return event => {
    event.added.forEach(add(field, event.index))
    store.maps[field]
      .splice(event.index, event.removedCount)
      .forEach(remove(field))
  }
}
export function add(field, main_index) {
  return (value, i) => {
    fetch(`/db/${field}`, {
      headers: new Headers({
        'content-type': 'application/json',
      }),
      method: 'POST',
      body: (value === Object(value)) ? JSON.stringify(value) : value,
    })
      .then(res => res.text())
      .then(id => {
        store.maps[field].splice(main_index + i, 0, id)
      })
  }
}

export function remove(field) {
  return key => {
    fetch(`/db/${field}/${key}`, {
      headers: new Headers({
        'content-type': 'application/json',
      }),
      method: 'DELETE',
    })
  }
}
