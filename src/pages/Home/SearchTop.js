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

export default SearchTop
