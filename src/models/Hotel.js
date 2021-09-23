import { makeAutoObservable } from 'mobx'
import { nanoid } from 'nanoid'

export class Hotel {
  id = null
  store = null

  constructor(store, id = nanoid(5)) {
    makeAutoObservable(this, {
      id: false,
      store: false,
    })
    this.store = store
    this.id = id
  }

  // ui component consume this one
  get asJson() {
    return {
      id: this.id,
    }
  }

  // mapping server data to client data
  updateFromJson(json) {
    const {
      id: serverId,
      name,
      rating,
      stars,
      address,
      photo,
      description,
    } = json
    this.serverId = serverId
    this.name = name
    this.rating = rating
    this.stars = stars
    this.address = address
    this.photo = photo
    this.description = description
  }
}
