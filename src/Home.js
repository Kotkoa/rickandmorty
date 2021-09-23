import "./App.css"
import Head from './head.js'
import { useSelector } from 'react-redux'


function Home() {

  const list = useSelector((state) => state.account.list)
  console.log(list)

  return (
    <div className="container">
      <Head title="Header" />
      <div className="body">List : {list}</div>
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
