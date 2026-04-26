import Users from './components/Users'
import './App.css'

const userPromise = fetch('http://localhost:3000/users').then(res => res.json());

function App() {

  return (
    <>
      <h1>simple crud</h1>
      <Users userPromise={userPromise}></Users>
    </>
  )
}

export default App
