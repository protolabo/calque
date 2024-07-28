import LogoIcon from "../assets/Logo.asset"

function MainMenu() {
  return (
    <div>MainMenu</div>
  )
}

function MenuNavbar() {
  return(
    <div>
      <div><LogoIcon/></div>
      <div>Calque</div>
      <div>Search Bar</div>
      <div>Login</div>
      <div>Sign Up</div>
    </div>
  )
}

function MenuCategories() {
  return(
    <div>
      <div>My Maps</div>
      <div>Browse Maps</div>
    </div>
  )
}

function MenuSubCategories(){
  return(
    <div>
      <div>Transit</div>
      <div>Shopping Centers</div>
      <div>Campuses</div>
      <div>Nature</div>
      <div>Uncategorized</div>
    </div>
  )
}

function MenuMap() {
  return(
    <div>
      <div>+</div>
        <div>
          <div>Map img</div>
          <div>Map title</div>
        </div>

    </div>
    
  )
}

export default { MainMenu, MenuNavbar, MenuMap, MenuCategories, MenuSubCategories }