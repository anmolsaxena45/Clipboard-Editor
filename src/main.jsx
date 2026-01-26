import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>,
)
