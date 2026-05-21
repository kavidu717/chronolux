
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './App/store.js'
import { Toaster } from 'react-hot-toast'

const Router = window.location.protocol === 'file:' ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <Toaster />
      <App />
    </Router>
  </Provider>
)
