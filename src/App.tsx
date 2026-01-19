import './App.css'
import CalendlyPopup from './components/CalendlyPopup'

function App() {
  return (
    <div className="developer-wip">
      <div className="background-animation">
        <span style={{'--i':1} as React.CSSProperties}>console.log("Building...")</span>
        <span style={{'--i':2} as React.CSSProperties}>const projects = [];</span>
        <span style={{'--i':3} as React.CSSProperties}>await createPortfolio();</span>
        <span style={{'--i':4} as React.CSSProperties}>// Stay tuned!</span>
      </div>

      <div className="content">
        <h1 className="typing">
          Pierre CLÉMENT
          <span className="cursor">|</span>
        </h1>
        <h2>
          Portfolio En Travaux
        </h2>
        <div className="spinner"></div>
        <p>Je travail actuellement sur des projets (dont ce site).</p>
        <p>Revenez plus tard ou contactez moi !</p>
        <div className="socials">
          <a href="https://github.com/KadenHD" target="_blank">GitHub</a>
          <a href="https://linkedin.com/in/pierre--clement" target="_blank">LinkedIn</a>
          <a href="mailto:pierre.clement.oise@gmail.com">Email</a>
          <CalendlyPopup/>
        </div>
      </div>
    </div>
  )
}

export default App
