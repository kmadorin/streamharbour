import layoutStyles from './layout.module.scss';
import Login from '../Shared/Login';
import {Layout, Row, Col, Button, Space,} from 'antd';
const {Header, Content, Footer} = Layout;
import {useState, useEffect} from "react";
import {useAccount, useConnect, useDisconnect} from 'wagmi';
import Address from "../Shared/Address";
import Profile from "../Profile";
import {LogoutIcon} from "../Shared/Icons";
import {Toaster} from 'react-hot-toast';

export default function SiteLayout({children}) {
	const [mounted, setMounted] = useState(false);
	const {address, isConnected} = useAccount();
	const {disconnect} = useDisconnect();
	const {activeConnector} = useConnect();

	const toastOptions = {
		style: {
			background: 'black',
			color: 'white'
		},
	}

	useEffect(() => {
		setMounted(true);
		if (!activeConnector) {
			disconnect()
		}

		activeConnector?.on('change', () => {
			disconnect()
		})
	}, [activeConnector, disconnect])

	return (

		<Layout className={layoutStyles.layout}>
			<Header className={layoutStyles.header}>
				<Row justify="space-between">
					<Col>
						<Profile />
					</Col>
					<Col>
						{mounted && address ? (
							<Space size={15}>
								<Address size="short" value={address}/>
								<Button type="default" size='small' onClick={disconnect}><LogoutIcon /></Button>
							</Space>
						) : <Login />}
					</Col>
				</Row>
			</Header>
			<Content>
				{children}
			</Content>
			<Toaster position="bottom-right" toastOptions={toastOptions}/>
		</Layout>
	)
}
