import { createRoot } from 'react-dom/client'
import './styles.css'
import {App as Canvas } from './layout/Canvas'
import { Overlay } from './components/Overlay'

createRoot(document.getElementById('root')).render(
  <>
    <Canvas />
    <Overlay />
  </>
)
