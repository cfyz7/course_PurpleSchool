import { MenuListProps } from "./MenuList.props";
import { Card } from "../../../components/Card/Card";
import styles from './MenuList.module.css'

export function MenuList({ products }: MenuListProps) {
  return <div className={styles['wrapper']}>{products.map((p) => (
    <Card 
      key={p.id}
      id={p.id} 
      name={p.name}
      desc={p.ingredients.join(', ')}
      rating={p.rating}
      price={p.price}
      image={p.image}
    /> 
  ))}
  </div>
}