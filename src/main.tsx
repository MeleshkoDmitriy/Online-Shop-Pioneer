import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Theme } from './styles/styles.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './Redux/store.ts'
import './styles/stylesZero.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <Theme>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Theme>
    </Provider>
)
