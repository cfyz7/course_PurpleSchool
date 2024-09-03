import { Link } from "react-router-dom"

export function Error() {
  return <>
    Error 
    <div>
    <Link to='/'>Меню</Link>
    <Link to='/cart'>Корзина</Link>
    </div>
  </>
}