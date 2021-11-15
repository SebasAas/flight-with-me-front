import { Route, Switch } from 'react-router-dom'

// Components
import Navbar from './Navbar'
import Footer from './Footer'
import Flights from './Flights'
import Dashboard from './Dashboard'


function App() {


  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Flights} />
        <Route exact path="/#/dashboard" component={Dashboard} />
      </Switch>
      {/* <Flights /> */}
      <Footer />
    </div>

  )
}

export default App
