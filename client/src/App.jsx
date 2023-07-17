import Table from './components/Table'
import SearchBox from './components/Searchbox'
import "@fontsource/roboto"

function App() {

  return (
    <div className='font-light font-sans'>
      <div className='text-center'>
      <h1 className='text-xl font-semibold'>COINSPACE</h1>
      </div>

      <SearchBox />
      <Table />
    </div>
  )
}

export default App
