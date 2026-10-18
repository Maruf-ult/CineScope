import { Search } from 'lucide-react'

const SearchBox = ({ Position }) => {
  return (
    <div className={`flex items-center justify-between gap-3 bg-gray-200 w-full py-2 px-2 rounded-sm ${Position === "top" ? "space-x-12" : "space-x-6"}`}>
      <input className='w-full bg-transparent outline-none' type="text" placeholder='Search Movies.....' />
      <Search className='text-gray-600 w-5 h-5 shrink-0 cursor-pointer hover:text-gray-800 transition-colors' />
    </div> 
  )
}

export default SearchBox
