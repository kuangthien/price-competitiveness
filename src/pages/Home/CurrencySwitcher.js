import { observer } from 'mobx-react'
import { useContext } from 'react'
import { AppContext } from '../..'

const CurrencySwitcher = observer(() => {
  const { hotelStore } = useContext(AppContext)
  const { currenyBulk: ls, selectedCurrency: choice } = hotelStore

  const changeHandler = (idx) => {
    hotelStore.updateSelectedCurrency(ls[idx])
  }

  const Options = () =>
    ls.map((k) => (
      <option key={k} value={k}>
        {k}
      </option>
    ))
    
  return (
    <div className="container">
      <div className="w-25 ml-auto mb-5">
        <select
          value={choice}
          className="form-select form-select-sm"
          onChange={(e) => changeHandler(e.currentTarget.selectedIndex)}
        >
          <Options />
        </select>
      </div>
      {/* {choice} */}
    </div>
  )
})

export default CurrencySwitcher
