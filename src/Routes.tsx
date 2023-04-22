import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Editor from '@scenes/Editor'
import Dashboard from '@scenes/Dashboard'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/design/:id/edit" component={Editor} />
        <Route path="/" component={Dashboard} />
      </Switch>
    </Router>
  )
}

export default Routes
