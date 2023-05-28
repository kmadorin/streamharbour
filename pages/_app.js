import {useEffect, useState} from "react";
import '../styles/globals.css'
import SiteLayout from "../components/SiteLayout";
import AppContext from "../components/utils/AppContext";

import {
	ALCHEMY_KEY,
	ALCHEMY_RPC,
	APP_NAME,
	CHAIN_ID,
	IS_MAINNET,
	WEB3_AUTH_CLIENT_ID
} from '../constants';

import {chain, configureChains, createClient, defaultChains, WagmiConfig} from 'wagmi';
import {CoinbaseWalletConnector} from 'wagmi/connectors/coinbaseWallet';
import {InjectedConnector} from 'wagmi/connectors/injected';
import {WalletConnectConnector} from 'wagmi/connectors/walletConnect';
import {alchemyProvider} from 'wagmi/providers/alchemy';
import {Web3AuthNoModal} from "@web3auth/no-modal";
import {ADAPTER_EVENTS, CHAIN_NAMESPACES, WALLET_ADAPTERS} from "@web3auth/base";
import {OpenloginAdapter} from "@web3auth/openlogin-adapter";
import Web3 from "web3";
import {EnvNames, NetworkNames, Sdk, Web3WalletProvider} from "etherspot";

const {chains, provider} = configureChains(
	[IS_MAINNET ? chain.polygon : chain.polygonMumbai, chain.mainnet],
	[alchemyProvider({apiKey: ALCHEMY_KEY})]
)

const connectors = () => {
	return [
		new InjectedConnector({
			chains,
			options: {shimDisconnect: true}
		}),
		new WalletConnectConnector({
			chains,
			options: {
				rpc: {[CHAIN_ID]: ALCHEMY_RPC}
			}
		}),
		new CoinbaseWalletConnector({
			chains,
			options: {
				appName: APP_NAME,
				jsonRpcUrl: ALCHEMY_RPC
			}
		})
	]
}

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider
})


function App({Component, pageProps}) {
	const [web3auth, setWeb3Auth] = useState(null);
	const [web3provider, setWeb3Provider] = useState(null);
	const [etherspotSDK, setEtherspotSDK] = useState(null);
	const [provider, setProvider] = useState(null);

	useEffect(() => {

		async function initEtherspot() {
			const web3AuthClientId = WEB3_AUTH_CLIENT_ID;

			const web3AuthInstance = new Web3AuthNoModal({
				clientId: web3AuthClientId,
				chainConfig: {
					chainNamespace: CHAIN_NAMESPACES.EIP155,
					chainId: '0x' + Number(CHAIN_ID).toString(16), // ChainID in hexadecimal
				},
				storageKey: 'local',
			});

			setWeb3Auth(web3AuthInstance);

			const openLoginAdapter = new OpenloginAdapter({
				adapterSettings: {
					network: 'testnet',
					clientId: web3AuthClientId,
				},
				loginSettings: {
					mfaLevel: 'none',
				},
			})

			web3AuthInstance.configureAdapter(openLoginAdapter);

			// Initialise the web3Auth instance after setting up the Adapter Configuration
			await web3AuthInstance.init()

			if (web3AuthInstance.provider) {
				setProvider(web3AuthInstance.provider);
			}
		}

		initEtherspot().catch((e) => {
			console.log('Init Etherspot error: ', e);
		});

	}, []);

	useEffect(() => {
		async function initEtherspotSDK() {

			if (!provider) {
				return undefined;
			}
			// Initialising web3Auth Provider as Web3 Injectable
			const web3 = new Web3(provider)
			const web3provider = new Web3WalletProvider(web3.currentProvider);
			setWeb3Provider(web3provider);
			// Refresh the web3 Injectable to validate the provider
			await web3provider.refresh()
			// Initialise the Etherspot SDK
			const sdk = new Sdk(web3provider, { networkName: NetworkNames.Mumbai, env: EnvNames.TestNets, omitWalletProviderNetworkCheck: true })
			setEtherspotSDK(sdk);
		}

		initEtherspotSDK().catch((e) => {
			console.log('Init Etherspot SDK error: ', e);
		});

	}, [provider])

	const injectedGlobalContext = {
		web3auth,
		web3provider,
		provider,
		etherspotSDK,
		setProvider
	}

	return (
		<WagmiConfig client={wagmiClient}>
			<AppContext.Provider value={injectedGlobalContext}>
				<SiteLayout>
					<Component {...pageProps} />
				</SiteLayout>
			</AppContext.Provider>
		</WagmiConfig>
	)
}

export default App
