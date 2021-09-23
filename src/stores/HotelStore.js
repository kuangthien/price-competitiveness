import axios from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'
import { Hotel } from '../models/Hotel'

export class HotelStore {
  hotels = []

  constructor(transportLayer, authorStore) {
    makeAutoObservable(this)
  }

  async load() {
    const uri = 'https://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo'
    const fetchedData = await axios.get(uri)
    const fncAction = () =>
      fetchedData.data.forEach((json) => this.updateTodoFromServer(json))
    runInAction(fncAction)
  }

  updateTodoFromServer(json) {
    let aHotel = this.hotels.find((obj) => obj.serverId === json.serverId)
    if (!aHotel) {
      // new data:
      aHotel = new Hotel(this)
      this.hotels.push(aHotel)
    }

    // upsert store
    aHotel.updateFromJson(json)
  }
}
