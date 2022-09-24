import {Col, Row} from "antd";
import styles from './home.module.scss';
import DonationForm from "../DonationForm";
import SubscriptionCard from "../SubscriptionCard";
import SendWidget from "../SendWidget";
import LoanWidget from "../LoanWidget";

const style = {
	background: '#0092ff',
	padding: '10px 0',
}

export default function Home() {
	return (
		<div className={styles.layout}>
			<Row gutter={20} md={{wrap: false}} className={styles.row}>
				<Col xs={{span: 24, order: 3}} lg={{span:5, order: 1}} className={styles.leftCol}>
					<div className={styles.subscriptionCard}>
						<SubscriptionCard/>
					</div>
					<div className={styles.subscriptionCard}>
						<SubscriptionCard/>
					</div>
					<div className={styles.subscriptionCard}>
						<SubscriptionCard/>
					</div>
				</Col>
				<Col xs={{span: 24, order: 1}} lg={{span:12, order: 2}} className={styles.centerCol}>
					<DonationForm/>
				</Col>
				<Col xs={{span: 24, order: 2}} lg={{span:7, order: 3}} className={styles.rightCol}>
					<SendWidget />
					<div style={{marginTop: '20px'}}>
						<LoanWidget />
					</div>
				</Col>
			</Row>
		</div>
	)
}
