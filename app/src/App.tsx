import { SuperheroesList } from '@/views/SuperheroesList.tsx'
import InputSearch from './components/InputSearch'

function App() {
  function onSearch (query: string) {
    console.log('searching', query)
  }

  return (
    <>
      <div className='max-w-screen-lg mx-auto'>
        <h2 className='text-neutral-700 font-bold text-4xl mt-24 mb-8'>Search your character</h2>
        <InputSearch className="mb-4" placeholder='Name of Character' onSearch={onSearch}/>
        <SuperheroesList />

        <footer className='font-sm mt-24 mb-16 text-neutral-500'>
          Data provided by Marvel © {new Date().toLocaleDateString('en', { year: 'numeric' })} Marvel
        </footer>
       </div>
    </>
  )
}

export default App
