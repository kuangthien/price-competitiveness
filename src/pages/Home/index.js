import { observer } from 'mobx-react'
import { useContext, useEffect } from 'react'
import { AppContext } from '../..'

const SearchTop = () => {
  return (
    <div className="container">
      <form className="d-flex p-3 py-5">
        <input
          className="form-control form-control-lg me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  )
}

const HotelList = observer(() => {
  const { hotelStore } = useContext(AppContext) // See the Timer definition above.

  const hotels = hotelStore.searchResults

  useEffect(() => {
    hotelStore.load()
  }, [hotelStore])
  if (hotels.NO_RESULT) {
    return null
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
  const { competitors } = objHotel
  const Competitors = () => {
    if (!competitors) return null
    return Object.keys(competitors).map((k) => (
      <b className="d-inline-block p-2" key={k}>
        <div>{k}</div>
        <div>{objHotel.competitors[k]}</div>
      </b>
    ))
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
          <div>Price: {objHotel.priceWithCurrency}</div>
          <div>
            Stars: {objHotel.stars} - Rating: {objHotel.rating}
          </div>
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
      <HotelList />
    </>
  )
}
export default Home
