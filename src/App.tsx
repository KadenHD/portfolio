import './App.css'

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
          Hi, I'm Pierre CLÉMENT<span className="cursor">|</span>
        </h1>
        <h2>
          Portfolio Under Construction
        </h2>
        <div className="spinner"></div>
        <p>I'm currently coding my projects. Check back soon!</p>
        <div className="socials">
          <a href="https://github.com/KadenHD" target="_blank">GitHub</a>
          <a href="https://linkedin.com/in/pierre--clement" target="_blank">LinkedIn</a>
          <a href="mailto:pierre.clement.oise@gmail.com">Email</a>
        </div>
      </div>
    </div>
  )
}

export default App
