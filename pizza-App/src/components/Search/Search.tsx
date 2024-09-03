import styles from './Search.module.css';
import { forwardRef } from 'react';
import { SearchProps } from './Search.props';
import cn from 'classnames';;

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input({isValid = true, className, ...props}, ref) {
	return (
    <div className={styles['input-wrapper']}>
      <input ref={ref} className={cn(className, styles['input'], {
				[styles['invalid']] : !isValid,
			})} {...props}/>
			<img className={styles['icon']} src='/search.svg' alt='Иконка поиска'/>
    </div>
	
	);
}); 

export default Search;