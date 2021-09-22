import "./App.css"
//import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="container">
      <div className="header">
        <div className="header_background">
          <div className="header_overlay">
            <div className="logo_rickmorty"></div>
            <div className="search_block">
              <input
                type="text"
                className="search_input"
                placeholder="Buscar personaje..."
              />
              <svg
                className="search_icon"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.8072 26.3362L20.7529 19.2819C20.6271 19.1561 20.4631 19.0905 20.2881 19.0905H19.7248C21.6005 17.0617 22.7489 14.3548 22.7489 11.3744C22.7489 5.09116 17.6577 0 11.3744 0C5.09116 0 0 5.09116 0 11.3744C0 17.6577 5.09116 22.7489 11.3744 22.7489C14.3548 22.7489 17.0617 21.6005 19.0905 19.7303V20.2881C19.0905 20.4631 19.1616 20.6271 19.2819 20.7529L26.3362 27.8072C26.5932 28.0643 27.0088 28.0643 27.2659 27.8072L27.8072 27.2659C28.0643 27.0088 28.0643 26.5932 27.8072 26.3362ZM11.3744 20.999C6.05361 20.999 1.74991 16.6953 1.74991 11.3744C1.74991 6.05361 6.05361 1.74991 11.3744 1.74991C16.6953 1.74991 20.999 6.05361 20.999 11.3744C20.999 16.6953 16.6953 20.999 11.3744 20.999Z"
                  fill="#F2F2F2"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="navigate"></div>
      </div>
      <div className="body">Home page</div>
      <div className="footer">
        <div className="horizontal">
          <div className="overlay">
            <div className="suazo"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
