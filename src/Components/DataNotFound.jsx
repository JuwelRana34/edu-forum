

function DataNotFound({ search, }) {
  return (
    <div className="text-center">
          <img className="mx-auto" src="https://cdn-icons-png.flaticon.com/128/16504/16504070.png" alt=""  />
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
           data  not found
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            Sorry, we couldn’t find the <span className="text-red-400"> " {search} "</span>  you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            
          </div>
        </div>
  )
}

export default DataNotFound