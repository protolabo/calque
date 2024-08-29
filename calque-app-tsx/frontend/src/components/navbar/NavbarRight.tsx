import ExportButton from "./ExportButton"
import ModeSwitcher from "./ModeSwitcher"
// import SaveButton from "./SaveButton"
import { AppContext } from '../Layout';
import { useContext } from "react";

const NavbarRight = () => {
  const { page } = useContext(AppContext);
  return (
    <div className="flex justify-end items-center gap-4">
      {page === 'creation' &&
      <>
        <ModeSwitcher/>
        {/*<SaveButton/>*/}
        <ExportButton/>
      </>
      }
    </div>
    
  )
}

export default NavbarRight