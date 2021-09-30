import { makeAutoObservable, runInAction } from 'mobx'
import { Hotel } from '../models/Hotel'
import mock1 from './mockData.json'
export class HotelStore {
  hotels = []
  selectedCurrency = 'USD'

  constructor(transportLayer, authorStore) {
    makeAutoObservable(this)
  }

  get searchResults() {
    if (!this.hotels.length)
      return {
        NO_RESULT: 'No result to display',
      }
    // A/C:
    // If the hotel details exist but not the prices, push that result to the bottom of the list
    // If the hotel details do not exist, but prices do, do not display that hotel
    return this.hotels
      .filter((o) => true && !(!o.isExistedDetails && o.price))
      .sort((_a, b) => (!b.price ? -1 : 1))
  }

  async load() {
    // const uri = 'https://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo'
    // const fetchedData = await axios.get(uri)

    const delay = () => new Promise((rs) => setTimeout(rs, 2000))
    await delay()
    const fetchedData = mock1
    const fncAction = () =>
      fetchedData.forEach((json) => this.updateTodoFromServer(json))
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
