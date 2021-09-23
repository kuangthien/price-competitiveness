import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { HotelStore } from './stores/HotelStore'

export const AppContext = createContext({
  hotelStore: new HotelStore(),
})

ReactDOM.render(
  <React.StrictMode>
    <AppContext.Provider value={{ hotelStore: new HotelStore() }}>
      <App />
    </AppContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
