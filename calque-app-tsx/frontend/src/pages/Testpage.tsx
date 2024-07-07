import LogoTest from "../assets/LogoTest.asset";
import LogoTestW from "../assets/LogoTestW.asset";
import Canvas from "../components/Canvas";
import NavbarTest from "../components/NavbarTest";

function Testpage() {
  return (
    <>
        <NavbarTest/>
        <Canvas/>
        <div className="bg-red-700">
          BRO TU MARCHES ENFIN!
          <LogoTestW/>
        </div>
        
    </>
    
  )
}

export default Testpage
