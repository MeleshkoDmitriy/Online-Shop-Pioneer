import './App.css'
import styled from 'styled-components'
import { AppRoutes } from './components/Routes/Routes'


const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
`

function App() {
  const test = {
    "id": 1,
    "category": "mixers",
    "title": "DJM-A9",
    "price": 2996,
    "img": "https://i.ibb.co/NnJCz0R/mixer-djm-a9.png",
    "description": "4-канальная модель DJM-A9, значительно модифицированная по сравнению с предшествующей версией DJM-900NXS2, поднимает планку для микшеров клубного уровня. Этот микшер с усовершенствованными характеристиками отличается чистым звуком, обеспечивает разные варианты подключения к другому оборудованию, а также имеет множество новых функций, чтобы перевести уровень выступлений на новый уровень. Микшер DJM-A9 — это более совершенный музыкальный инструмент для эмоционального и динамичного шоу, где сохранен привычный функционал и компоновка, ставшие клубным стандартом.",
    "rating": 4.5,
    "isFavorite": false,
    "isCart": false,
    "features": {
      "sale": false,
      "new": false,
      "top": false
    }
  }



  return (
    <Wrapper >
      <AppRoutes />
    </Wrapper>
  )
}

export default App
