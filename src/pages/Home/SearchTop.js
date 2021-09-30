import { observer } from 'mobx-react'
import { useContext, useRef } from 'react'
import { AppContext } from '../..'

const SearchTop = observer(() => {
  const { hotelStore } = useContext(AppContext)
  const inputRef = useRef()
  const handleSearch = (keyword) => hotelStore.load(keyword)
 
  return (
    <div className="container">
      <form
        className="d-flex p-3 py-5"
        onSubmit={(e) => {
          e.preventDefault()
          handleSearch(inputRef.current.value)
        }}
      >
        <input
          className="form-control form-control-lg me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          ref={inputRef}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  )
})

export default SearchTop
