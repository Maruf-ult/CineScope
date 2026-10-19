import { Search } from 'lucide-react'

const SearchBox = ({ Position }) => {
  return (
    <div className="flex items-center justify-between gap-3 bg-gray-200  h-10  rounded-sm w-full overflow-hidden">
      <input className='w-full bg-transparent outline-none pl-3 text-sm' type="text" placeholder='Search Movies.....' />
      <div className={`
        flex items-center justify-center h-full px-3 shrink-0 cursor-pointer transition-colors
        ${Position === "top" 
          ? 'text-gray-600 hover:text-gray-800' 
          : 'text-white bg-blue-500 hover:bg-blue-600'
        }
      `}>
        <Search className="w-4 h-4" />
      </div>
    </div> 
  )
}

export default SearchBox
