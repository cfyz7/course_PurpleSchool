import { Link } from 'react-router-dom';
import styles from './Card.module.css';
import { CardProps } from './Card.props';
import { useDispatch } from 'react-redux';
import { AppDispath } from '../../store/store';
import { cartActions } from '../../store/cart.slice';
import { MouseEvent } from 'react';

export function Card(props: CardProps) {
  const dispatch = useDispatch<AppDispath>()

  const add = (e: MouseEvent) => {
    e.preventDefault()
    dispatch(cartActions.add(props.id))
  }

  return (
    <Link to={`/product/${props.id}`} className={styles['link']}>

      <div className={styles['card']}>

        <div className={styles['card-header']} style={{backgroundImage: `url('${props.image}')`}}>
          <div className={styles['price']}>
            {props.price}&nbsp;
            <span className={styles['currency']}>₽</span>
          </div>

          <button className={styles['add-to-cart']} onClick={add}>
            <img src='/bag.svg' alt='Добавить в корзину'  className={styles['icon-bag']}/>
          </button>

          <div className={styles['rating']}>
            {props.rating}&nbsp;
            <img src="/star.svg" alt="Иконка звезды"/>
          </div>
        </div>
        
        <div className={styles['card-footer']}>
          <div className={styles['card-title']}>{props.name}</div>
          <div className={styles['card-desc']}>{props.desc}</div>
        </div>   

      </div>

    </Link>
  )
}