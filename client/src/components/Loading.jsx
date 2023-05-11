
function Loading() {
  return (
    <div className="absolute w-full h-full">
        <div className="h-full">
            <h1 className="text-4xl font-bold text-center p-10 w-full">Loading...</h1>
           
                <div className="animate-spin rounded-full h-32 w-32 border-4 border-gray-900 border-t-yellow-500 m-auto mt-48"></div>
 
        </div>
    </div>
  )
}

export default Loading