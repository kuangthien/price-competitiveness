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
const HotelList = () => {
  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 ">
        {[...Array(10).keys()].map((k) => {
          return (
            <div className="col">
              <HotelListItem />
            </div>
          )
        })}
      </div>
    </div>
  )
}
const HotelListItem = () => {
  const objHotel = {
    id: 1,
    name: 'Shinagawa Prince Hotel',
    rating: 7.7,
    stars: 4,
    address: '108-8611 Tokyo Prefecture, Minato-ku, Takanawa 4-10-30, Japan',
    photo: 'https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg',
    price: 164,
    competitors: {
      Traveloka: 190,
      Expedia: 163,
    },
    taxes_and_fees: {
      tax: 13.12,
      hotel_fees: 16.4,
    },
    description:
      '<p>Boasting 15 food and beverage options, 2 swimming pools, and its own aquarium, Prince Hotel is right next to JR Shinagawa Train Station, from where Haneda Airport is only a 25-minute train ride away. This 39-storey hotel offers beautiful Tokyo views and free WiFi throughout the entire hotel.</p> <br> <p>The air-conditioned rooms at Shinagawa Prince Hotel have a fridge and an en suite bathroom with a bathtub and shower booth. Free toiletries and a hairdryer are provided. Guests will also find a personal locker in the room.</p> <br> <p>By train, Shibuya is 5 stops away and Shinjuku is a 16-minute ride. Tokyo Station is an 11-minute train ride away. Direct buses to and from Narita Airport stop at the hotel.</p> <br> <p>A city within a city, the hotel has its own movie theatre, bowling alley and tennis courts. Guests can enjoy a visit to the karaoke bar. The hotel also features a 24-hour front desk, indoor and outdoor pools, a sauna facility and massage services. Currency exchange service is available. Guests will find drink vending machines and a cash machine on site.</p> <br> <p>The 39th-floor Dining & Bar Table 9 Tokyo offers one of Tokyo’s best views. Restaurants serves unique Western cuisine, grill and steaks, while the bar lounge offers fusion tapas and drinks including whiskey, cocktails, sake and champagne. </p> <br> <p>Minato is a great choice for travellers interested in clean streets, friendly locals and culture.</p>',
  }
  const Competitors = () => {
    return Object.keys(objHotel.competitors).map((k) => (
      <b className="d-inline-block p-2">
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
