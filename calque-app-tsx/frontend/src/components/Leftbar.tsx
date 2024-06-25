function Leftbar() {
  return (
    <div className="fixed left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <div className="bg-blue-900 text-white">
        Etage
      </div>
      <div className="bg-white-100 text-dark">
        Lignes
      </div>
      <div className="bg-red-500 text-white">
        Tags
      </div>
    </div>
  )
}

export default Leftbar
