import { useState } from 'react'
import css from '../App/App.module.css'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={css.app}>
	<header className={css.toolbar}>
		{/* Компонент SearchBox */}
		{/* Пагінація */}
		{/* Кнопка створення нотатки */}
  </header>
</div>
   
  )
}
