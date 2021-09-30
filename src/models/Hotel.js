import { makeAutoObservable } from 'mobx'
import { nanoid } from 'nanoid'

const Utils = {
  getRoundedPriceWithCurrency: (originalPrice, currency) => {
    // A/C:
    // Hotel prices in the results page are typically rounded
    // Currencies like USD, SGD, CNY are rounded to their nearest dollar. E.g. USD 100.21 is displayed as USD 100
    // Currencies like KRW, JPY, IDR are rounded to their nearest 100-dollars. E.g. KRW 300123.22 is displayed as KRW 300,100
    let rounded
    const selectedCurrency = currency

    if (['USD', 'SGD', 'CNY'].includes(selectedCurrency)) {
      rounded = Math.round(originalPrice * 1) / 1
    } else if (['KRW', 'JPY', 'IDR'].includes(selectedCurrency)) {
      rounded = Math.round(originalPrice * 0.01) / 0.01
    } else {
      rounded = originalPrice
    }

    const formatted = new Intl.NumberFormat(undefined).format(rounded)
    return `${selectedCurrency} ${formatted}`
  },
}
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

  get isExistedDetails() {
    return this.id && this.name && this.address // => assumption
  }
  get lsCompetitor() {
    // transform obj => arr

    const rs = Object.keys(this.competitors).map((key) => ({
      key,
      rate: this.competitors[key],
      rateWithCurrency: Utils.getRoundedPriceWithCurrency(
        this.competitors[key],
        this.store.selectedCurrency
      ),
    }))

    return rs
  }

  get isGivenCompetitorRates() {
    if (!this.lsCompetitor.length) return false
    const foundIssue = this.lsCompetitor.find((o) => !o.rate)
    return !foundIssue
  }

  get priceWithCurrency() {
    // A/C:
    // When I do not have prices returned for the currency, that means the rates are unavailable for that hotel
    // If the hotel details exist but not the prices, then show that hotel result has having "Rates unavailable" and push that result to the bottom of the list
    // If the hotel details do not exist, but prices do, do not display that hotel

    if (this.isExistedDetails && !this.price) {
      return 'Rates unavailable'
    }

    return Utils.getRoundedPriceWithCurrency(
      this.price,
      this.store.selectedCurrency
    )
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
      price,
      competitors,
    } = json
    this.serverId = serverId
    this.name = name
    this.rating = rating
    this.stars = stars
    this.address = address
    this.photo = photo
    this.description = description
    this.price = price
    this.competitors = competitors || []
  }
}
