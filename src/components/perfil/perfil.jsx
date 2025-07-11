import './perfil.css'

function Perfil({ translations }) {
  return (
    <section className="apresentacao">
      <div className="apresentacao-content">
        <div className="apresentacao-texto">
          <h1>{translations.title}</h1>
          <p className="subtitulo">{translations.subtitle}</p>
        </div>
        <div className="apresentacao-imagem">
          <img src="/cloud.png" alt="Cloud Computing" />
        </div>
      </div>
    </section>
  )
}

export default Perfil