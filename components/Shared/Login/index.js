import {Button, Modal, Typography} from 'antd';
import AppContext from "../../utils/AppContext";
import { ADAPTER_EVENTS, WALLET_ADAPTERS, CHAIN_NAMESPACES } from '@web3auth/base';
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import Web3 from "web3";
import {useState, useEffect, useContext} from "react";
import SocialSelector from "./SocialSelector";
const {Title} = Typography;

import loginStyles from './login.module.scss';

export default function Login() {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const setHasConnected = () => {
		setIsModalVisible(false);
	}

	return (
		<div>
			<Button type='primary' size='small' onClick={showModal}>Log in</Button>
			<Modal
				open={isModalVisible}
				footer={null}
				onOk={handleOk}
				onCancel={handleCancel}
				closable={false}
				width={480}
			>
				<Title level={3} className={loginStyles.heading}>Connect Wallet</Title>
				<SocialSelector setHasConnected={setHasConnected} />
			</Modal>
		</div>
	)
}
