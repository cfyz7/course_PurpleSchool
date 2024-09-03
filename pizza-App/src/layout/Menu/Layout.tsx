import styles from './Layout.module.css';
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Button from '../../components/Button/Button';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispath, RootState } from '../../store/store';
import { getProfile, userActions } from '../../store/user.slice';
import { useEffect } from 'react';

export default function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispath>()
  const profile = useSelector((s: RootState) => s.user.profile);
  const items = useSelector((s: RootState) => s.cart.items)

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  const logout = () => {
    dispatch(userActions.logout())
    navigate('/auth/login');
  }

  return <div className={styles['layout']}>
    <div className={styles['sidebar']}>

      <div className={styles['user']}>
        <img src="/avatar.png" alt="Иконка аватара" className={styles['avatar']}/>
        <div className={styles['name']}>{profile?.name}</div>
        <div className={styles['email']}>{profile?.email}</div>
      </div>

      <div className={styles['menu']}>
        <NavLink to='/' className= { ({isActive}) => cn(styles['link'], {
          [styles.active] : isActive
        })}>
          <img src="/menu.svg" alt="Иконка меню" className={styles['icon']}/>
          Меню
        </NavLink>

        <NavLink to='/cart' className= { ({isActive}) => cn(styles['link'], {
          [styles.active] : isActive
        })}>
          <img src="/cart.svg" alt="Иконка корзины" className={styles['icon']}/>
          Корзина 
          <span className={styles['cart-count']}>{items.reduce((acc, item) => acc += item.count, 0)}</span>
        </NavLink>
      </div>
      <Button className={styles['exit']} onClick={logout}>
        <img src='/exit-icon.svg' alt='Кнопка выйти'/>
        Выйти
      </Button>

    </div>

    <div className={styles['content']}>
      <Outlet/>
    </div>

  </div>
}

