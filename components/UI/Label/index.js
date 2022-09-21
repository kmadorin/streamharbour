import clsx	from 'clsx';
import styles from './label.module.scss';

export default function Label({className, children}) {
	return (<span className={clsx(styles.label, className)}>
		{children}
	</span>)
}
