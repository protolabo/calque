import { FiPlus } from "react-icons/fi";

function Leftbar() {
  return (
    <div className="fixed left-0 grid z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <div className="bg-blue-900 text-dark flex justify-between items-center p-2">
        Etage
        <FiPlus />
      </div>
      <div className="bg-transparent text-dark flex justify-between items-center p-2">
        Lignes
        <FiPlus />
      </div>
      <div className="bg-red-500 text-white flex justify-between items-center p-2">
        Tags
        <FiPlus />
      </div>
    </div>
  )
}

export default Leftbar
