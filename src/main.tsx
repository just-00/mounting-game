import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'amfe-flexible';
import AppRouter from './routes';
import './index.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
