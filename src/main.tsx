import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Theme } from './styles/styles.tsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Theme>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Theme>
)
