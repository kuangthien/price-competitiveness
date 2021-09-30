import { makeAutoObservable, runInAction } from 'mobx'
import { Hotel } from '../models/Hotel'
import mock1 from './mockData.json'
import mock2 from './mockDataSGD.json'

export class HotelStore {
  hotels = null
  searchKeyword = null
  selectedCurrency = 'USD'
  currenyBulk = ['USD', 'SGD', 'CNY', 'KRW', 'JPY', 'IDR']

  constructor() {
    makeAutoObservable(this)
  }

  updateSelectedCurrency(value) {
    // A/C: When you switch, a new API call is made for that currency to re-render results. New currency should now be persisted as the user's default choice
    this.selectedCurrency = value
    this.load(this.searchKeyword)
  }

  get searchResults() {
    if (!this.hotels) {
      return {
        NO_RESULT: 'Please search',
      }
    } else if (!this.hotels.length) {
      return {
        NO_RESULT: 'No result to display',
      }
    }
    // A/C:
    // If the hotel details exist but not the prices, push that result to the bottom of the list
    // If the hotel details do not exist, but prices do, do not display that hotel
    return this.hotels
      .filter((o) => true && !(!o.isExistedDetails && o.price))
      .sort((_a, b) => (!b.price ? -1 : 1))
  }

  async load(keyword) {
    // const uri = 'https://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo'
    // const fetchedData = await axios.get(uri)

    const delay = () => new Promise((rs) => setTimeout(rs, 2000))
    await delay()

    const mockData = { USD: mock1, SGD: mock2 }
    const fetchedData = mockData[this.selectedCurrency] || []
    console.log('load ' + keyword + ' cur ' + this.selectedCurrency)

    runInAction(() => {
      this.searchKeyword = keyword
      this.hotels = []
      fetchedData.forEach((json) => this.updateTodoFromServer(json))
    })
  }

  updateTodoFromServer(json) {
    let aHotel = this.hotels.find((obj) => obj.serverId === json.id)
    if (!aHotel) {
      // new data:
      aHotel = new Hotel(this)
      this.hotels.push(aHotel)
    }

    // upsert store
    aHotel.updateFromJson(json)
  }
}
