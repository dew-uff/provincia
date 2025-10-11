import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './application/contexts/AuthContext'
import { AppRoutes } from './application/routes/AppRoutes'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
