import LogoIcon from "../assets/Logo.asset"

function LandingPage() {
  return (
    <div>
      <div className="w-screen h-screen bg-primary text-center content-around flex flex-col justify-center items-center space-y-8">
        <div className="text-7xl text-white">Un générateur de cartes interactives pour tous les endroits, pour tout le monde.</div>
        <div className="text-primary p-4 bg-slate-100 w-48 rounded-full content-center">Essai Gratuit</div>
      </div>
      <div>
        <div>Avec calque, aidez des millions de personnes à trouver leur chemin. </div>
        <div>Cree ta propre carte!</div>
      </div>
      <div>
        <div>Possibilite de calquer des cartes statiques existantes!</div>
        <div>Ne te perds plus jamais!</div>
      </div>
      
  </div>
  )
}

export default LandingPage