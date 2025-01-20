

function DataNotFound({ title, description }) {
  return (
    <div className="text-center px-2">
          <img className="mx-auto" src="https://cdn-icons-png.flaticon.com/128/16504/16504070.png" alt=""  />
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
           {title}
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
          <span className="text-red-400"> {description}</span> 
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            
          </div>
        </div>
  )
}

export default DataNotFound