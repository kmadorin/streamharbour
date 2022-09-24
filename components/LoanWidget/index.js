import styles from './loanWidget.module.scss';
import {Button, Form, Input, Typography} from 'antd';
import {useState} from 'react';

const {Title} = Typography;

export default function LoanWidget() {
	const [delegationForm] = Form.useForm();
	const [amount, setAmount] = useState(0);

	function handleAmountChange(e) {
		setAmount(e.target.value)
	}

	function approveDelegation() {

	}

	return (<div className={styles.widget}>
		<Title level={2} className={styles.title}>Approve Loan</Title>

		<Form form={delegationForm} requiredMark={false} onFinish={approveDelegation} className={styles.form}>
			<Form.Item
				name="amount"
				label="USDT"
			>
				<Input
					placeholder="0" onChange={handleAmountChange}
					value={amount}
					required
				/>
			</Form.Item>
			<Button
				type="primary"
				htmlType="submit"
				className={styles.loanBtn}
				size="large"
				block
			>
				{amount ? `Loan ${amount} USDT` : 'Enter amount'}
			</Button>
		</Form>
	</div>)
}
