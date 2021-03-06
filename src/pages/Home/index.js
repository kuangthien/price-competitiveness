import { observer } from 'mobx-react'
import { useContext } from 'react'
import { AppContext } from '../..'
import SearchTop from './SearchTop'
import CurrencySwitcher from './CurrencySwitcher'

const HotelList = observer(() => {
  const { hotelStore } = useContext(AppContext) // See the Timer definition above.

  const hotels = hotelStore.searchResults

  if (hotels.NO_RESULT) {
    return <div className="text-center">{hotels.NO_RESULT}</div>
  }
  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 ">
        {hotels.map((obj, idx) => {
          return (
            <div className="col" key={idx}>
              <HotelListItem hotel={obj} />
            </div>
          )
        })}
      </div>
    </div>
  )
})
const HotelListItem = ({ hotel }) => {
  const objHotel = hotel
  const { lsCompetitorAndUs: lsCompetitor } = objHotel
  const Competitors = () => {
    return lsCompetitor.map((o) => (
      <b className="d-inline-block p-2" key={o.key}>
        <div>{o.key}</div>
        <div>{o.rateWithCurrency}</div>
      </b>
    ))
  }
  const SavingDisplay = () => {
    if (!objHotel.savingMessageIfExist) return null
    const { mostExpensiveRate, msg } = objHotel.savingMessageIfExist
    return (
      <>
        ( <strike>{mostExpensiveRate}</strike> {msg})
      </>
    )
  }

  const TaxesAndFees = () => {
    if (!objHotel.taxesAndFeesWithCurrency) return null

    const { tax, hotelFees } = objHotel.taxesAndFeesWithCurrency
    return (
      <b className="taxAndFeeWrapper">
        (?)
        <b className="taxAndFee">
          <br /> Inclued: <br /> Tax: {tax} - Fees: {hotelFees}{' '}
        </b>
        <style>
          {`
          .taxAndFee{display:none}
          .taxAndFeeWrapper{cursor:pointer}
          .taxAndFeeWrapper:hover  .taxAndFee{display:block}
          `}
        </style>
      </b>
    )
  }

  const Price = () => {
    return (
      <div>
        Price: {objHotel.priceWithCurrency} <TaxesAndFees />
      </div>
    )
  }

  return (
    <>
      <div className="card shadow-sm">
        <div
          className=""
          style={{ backgroundImage: `url(${objHotel.photo})`, height: 200 }}
        />
        <div className="card-body">
          <div className="fw-bold">{objHotel.name}</div>

          <div>
            Stars: {objHotel.stars} - Rating: {objHotel.rating}
          </div>
          <SavingDisplay />
          <Price />

          <hr />
          <div>{objHotel.address}</div>
          <div>
            <Competitors />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                Book!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
const Home = () => {
  return (
    <>
      <SearchTop />
      <CurrencySwitcher />
      <HotelList />
    </>
  )
}
export default Home
