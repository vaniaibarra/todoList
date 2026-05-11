import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/Navbar'
import { useAuth } from './context/AuthContext'

function App() {
  const { loading } = useAuth();
  if(loading) return null;

  return (
    <>
      <BrowserRouter>
        <main className="min-h-screen w-full flex flex-col" >
          <Navbar className="w-full"/>
          <AppRoutes/>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
