import Table from './components/Table'
import SearchBox from './components/Searchbox'

function App() {

  return (
    <>
      <div className='text-center'>
      <h1 className='font-bold text-xl font-mono'>COINSPACE</h1>
      </div>

      <SearchBox />
      <Table />
    </>
  )
}

export default App
