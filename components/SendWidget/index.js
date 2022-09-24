import {Form, Input, Button} from 'antd';
import Image from 'next/image';
import {useState} from "react";
import {PUBLIC_URL} from "../../constants";
import styles from './sendWidget.module.scss';
const {TextArea} = Input;

export default function SendWidget() {
	const [sendMessageForm] = Form.useForm();
	const [message, setMessage] = useState();

	function OnMessageChanged(e) {
		setMessage()
	}

	function sendMessage() {

	}

	return (<div className={styles.widget}>
		<Form form={sendMessageForm} requiredMark={false} onFinish={sendMessage} className={styles.form}>
			<Form.Item
				name="message"
			>
				<TextArea
					required
					placeholder="Message" onChange={OnMessageChanged}
					value={message}
					autoSize={{minRows: 2}}
				/>
			</Form.Item>
			<Button
				type="primary"
				htmlType="submit"
				className={styles.sendBtn}
				size="large"
				block
			>
				Send private message
			</Button>
		</Form>
		<div className={styles.footer}>
			<span>Powered by</span>
			<Image
				priority
				src={`${PUBLIC_URL}/images/xmtp_logo.svg`}
				height={15}
				width={64}
				alt="logo"
				className={styles.logo}
			/>
		</div>
	</div>)
}
