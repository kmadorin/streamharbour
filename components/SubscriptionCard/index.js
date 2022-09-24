import {Typography, Button} from 'antd';
const {Title, Text} = Typography;
import styles from './subscriptionCard.module.scss';

export default function SubscriptionCard({className}) {
	return (
		<article className={styles.card}>
			<Title level={2} className={styles.title}>
				Thanks
			</Title>
			<Text className={styles.info}>
				Entry level for those who wants to say thank you for the author
			</Text>
			<Text className={styles.price}>
				<span className={styles.amount}>10 USD</span>&nbsp;/&nbsp;<span className={styles.duration}>month</span>
			</Text>
			<Button type="primary" size="large" block>Subscribe</Button>
		</article>
	)
}
