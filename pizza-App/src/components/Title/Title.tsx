import { TitleProps } from './Titile.props';
import styles from './Title.module.css';
import cn from 'classnames'

export function Title({children,className, ...props}: TitleProps) {
  return (
    <div>
      <h1 className={cn(className, styles['h1'])}{...props}>{children}</h1>
    </div>
  )
}