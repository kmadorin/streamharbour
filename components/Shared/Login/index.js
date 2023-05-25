import {Button, Modal, Typography} from 'antd';
import { Web3AuthNoModal } from '@web3auth/no-modal';
import { ADAPTER_EVENTS, WALLET_ADAPTERS, CHAIN_NAMESPACES } from '@web3auth/base';
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import Web3 from "web3";
import {useState, useEffect} from "react";
import WalletSelector from "./WalletSelector";
import { Sdk, Web3WalletProvider, NetworkNames, EnvNames } from 'etherspot';
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

	console.log('Login component initialised');


	useEffect(() => {
		async function initEtherspot() {
			const web3AuthClientId = `BKh_aSUQzj2JiUqqSo_zOfVrpTWdG05ma1k02oCfmcx3zDbiW9d6WkqBCN5HmxxgZh1nGIMzKMXWOs8t7wfCy7o`;
	    
	    const web3AuthInstance = new Web3AuthNoModal({
			  clientId: web3AuthClientId,
			  chainConfig: {
			    chainNamespace: CHAIN_NAMESPACES.EIP155,
			    chainId: '0x13881', // ChainID in hexadecimal
			  },
			  storageKey: 'local',
			})

			const openLoginAdapter = new OpenloginAdapter({
			  adapterSettings: {
			    network: 'testnet',
			    clientId: web3AuthClientId,
			  },
			  loginSettings: {
			    mfaLevel: 'none',
			  },
			})

			web3AuthInstance.configureAdapter(openLoginAdapter)

			// Listen to events emitted by the Web3Auth Adapter
			web3AuthInstance.on(ADAPTER_EVENTS.CONNECTED, () => {
			  if (!web3AuthInstance?.provider) {
			    return
			  }
			})

			web3AuthInstance.on(ADAPTER_EVENTS.ERRORED, (error) => {
			  console.log(error)
			})

			// Initialise the web3Auth instance after setting up the Adapter Configuration
			await web3AuthInstance.init()

			let web3authProvider

			if (web3AuthInstance.provider) {
				web3authProvider = web3AuthInstance.provider;
			} else {
				try {
				    // login_hint is optional parameter which accepts any string and can be set to null
			    web3authProvider = await web3AuthInstance.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
			      loginProvider: "google",
			    });
				}
				catch (e) {
				  console.log(`Failed to login! Reason: ${e instanceof Error && e?.message ? e.message : 'unknown'}.`)
				  return
				}
			}	

			if (!web3authProvider) {
			  console.log(`Failed to get the provider connected`)
			  return
			}
			// Initialising web3Auth Provider as Web3 Injectable
			const web3 = new Web3(web3authProvider)
			const web3provider = new Web3WalletProvider(web3.currentProvider)
			// Refresh the web3 Injectable to validate the provider
			await web3provider.refresh()
			// Initialise the Etherspot SDK
			const etherspotSdk = new Sdk(web3provider, { networkName: NetworkNames.Mumbai, env: EnvNames.TestNets, omitWalletProviderNetworkCheck: true })
			const res = await etherspotSdk.computeContractAccount();

			console.log('res: ', res);
		}

		initEtherspot().catch((e) => {
			console.log('Init Etherspot error: ', e);
		});

  }, []);

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
				<WalletSelector setHasConnected={setHasConnected} />
			</Modal>
		</div>
	)
}
