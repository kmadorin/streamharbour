import {Col, Row} from "antd";
import styles from './home.module.scss';
import DonationForm from "../DonationForm";

const style = {
	background: '#0092ff',
	padding: '10px 0',
}

export default function Home() {
	return (
		<div className={styles.layout}>
			<Row gutter={20}>
				<Col span={5}>
				</Col>
				<Col span={12}>
					<DonationForm />
				</Col>
				<Col span={7}>
				</Col>
			</Row>
		</div>
	)
}
