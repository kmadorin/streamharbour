import layoutStyles from './layout.module.scss';
import Login from '../Shared/Login';
import {Layout, Row, Col, Button, Space,} from 'antd';

const {Header, Content, Footer} = Layout;
import {useState, useEffect, useContext} from "react";
import {useAccount, useConnect, useDisconnect} from 'wagmi';
import Address from "../Shared/Address";
import Profile from "../Profile";
import {LogoutIcon} from "../Shared/Icons";
import {Toaster} from 'react-hot-toast';
import AppContext from "../utils/AppContext";

export default function SiteLayout({children}) {
	const {etherspotSDK, web3auth, web3provider} = useContext(AppContext);
	const state = etherspotSDK && etherspotSDK.state;

	const [mounted, setMounted] = useState(false);
	const [address, setAddress] = useState();
	// const {address, isConnected} = useAccount();
	// const {disconnect} = useDisconnect();
	const {activeConnector} = useConnect();

	const toastOptions = {
		style: {
			background: 'black',
			color: 'white'
		},
	}

	function logout () {
		if (web3auth) {
			console.log(`###: web3auth`, web3auth);
			web3auth.logout();
			setAddress(null);
		}
	}



	useEffect(() => {
		setMounted(true);

		async function getEtherspotAccount() {
			if (state) {
				const { account } = state;
				const computedAccount = await etherspotSDK.computeContractAccount();
				console.log(`###: computedAccount`, computedAccount);
				// const {balances} = etherspotSDK.getAccountBalances(account.address, ['0x0000000000000000000000000000000000001010']);
				// console.log(`###: balances`, balances);
				// console.log(`###: account`, account);
				setAddress(account.address);
			}
		}

		getEtherspotAccount().then(res => console.log(`###: res`, res)).catch(err => console.log(`###: err`, err));

	}, [state])

	// useEffect(() => {
	// 	setMounted(true);
	// 	if (!activeConnector) {
	// 		disconnect()
	// 	}
	//
	// 	activeConnector?.on('change', () => {
	// 		disconnect()
	// 	})
	// }, [activeConnector, disconnect])

	return (

		<Layout className={layoutStyles.layout}>
			<Header className={layoutStyles.header}>
				<Row justify="space-between">
					<Col>
						<Profile/>
					</Col>
					<Col>
						{mounted && address ? (
							<Space size={15}>
								<Address size="short" value={address}/>
								<Button type="default" size='small' onClick={logout}><LogoutIcon/></Button>
							</Space>
						) : <Login/>}
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
