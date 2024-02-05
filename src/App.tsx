import './App.css'
import PasswordGenerator from './components/PasswordGenerator'

function App() {

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md">
        <PasswordGenerator />
      </div>
    </div>
  )
}

export default App
