import { useState } from 'react'
import './scss/main.scss'
import Table from './components/Table'
import SearchBox from './components/Searchbox'

function App() {

  return (
    <>
      <SearchBox />
      <Table />
    </>
  )
}

export default App
