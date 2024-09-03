import styles from './Menu.module.css';
import Search from '../../components/Search/Search';
import { Title } from '../../components/Title/Title';
import { PREFIX } from '../../helpers/API';
import { ProductProps } from '../../interfaces/product.interface';
import { ChangeEvent, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';

export function Menu() {
  
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [filter, setFilter] = useState<string>();

  useEffect(() => {
    getMenu(filter);
  }, [filter])

  const getMenu = async(name?: string) => {
    try {
      setIsLoading(true);
      const {data} = await axios.get<ProductProps[]>(`${PREFIX}/products`, {
        params: {
          name
        }
      });
      setProducts(data)
      setIsLoading(false)
    }
    catch(e) {
      console.error(e)
      if(e instanceof AxiosError) {
        setError(e.message)
      }
      setIsLoading(false)
      return;
    }
  }

  const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }


  return ( 
   <div>
     <div className={styles['head']}>
      <Title>Меню</Title>
      <Search placeholder='Введите блюдо или состав' onChange={updateFilter}/>
    </div>
    <div>
      {error && <>{error}</>}
      {!isLoading && products.length > 0 && <MenuList products={products}/>}
      {isLoading && <>Загружаем данные...</>}
      {!isLoading && products.length === 0 && <>Не найдено блюд по запросу</>}
    </div>
   </div>
  )
}

export default Menu;