import '../styles/globals.css'
import SiteLayout from "../components/SiteLayout";

import {
	ALCHEMY_KEY,
	ALCHEMY_RPC,
	APP_NAME,
	CHAIN_ID,
	IS_MAINNET,
} from '../constants';

import {chain, configureChains, createClient, defaultChains, WagmiConfig} from 'wagmi';
import {CoinbaseWalletConnector} from 'wagmi/connectors/coinbaseWallet';
import {InjectedConnector} from 'wagmi/connectors/injected';
import {WalletConnectConnector} from 'wagmi/connectors/walletConnect';
import {alchemyProvider} from 'wagmi/providers/alchemy';

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
	return (
		<WagmiConfig client={wagmiClient}>
			<SiteLayout>
				<Component {...pageProps} />
			</SiteLayout>
		</WagmiConfig>
	)
}

export default App
