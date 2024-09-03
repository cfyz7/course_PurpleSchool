import styles from './Input.module.css';
import { forwardRef } from 'react';
import { InputProps } from './Input.props';
import cn from 'classnames';;

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({isValid = true, className, ...props}, ref) {
	return (
		<input ref={ref} className={cn(className, styles['input'], {
				[styles['invalid']] : !isValid,
			})} {...props}/>
	);
}); 

export default Input;