import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import UsersList from "./components/Users-list"


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header"></header>
        <Route exact path="/" component={UsersList} />
      </div>
    </Router>
  )
}

export default App