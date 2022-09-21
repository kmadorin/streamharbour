import {useConnect} from 'wagmi';
import {Button} from 'antd';
import Logger from '../../../lib/logger';
import getWalletLogo from "../../../lib/getWalletLogo";
import walletSelectorStyles from './wselector.module.scss';
import Image from 'next/image';

export default function WalletSelector({setHasConnected}) {
	const {connectors, error, connectAsync, isConnecting, pendingConnector} =
		useConnect();

	async function onConnect(connector) {
		try {
			const account = await connectAsync({connector})
			if (account) {
				setHasConnected(true)
			}
		} catch (error) {
			Logger.warn('[Sign Error]', error)
		}
	}

	return (
		<div className={walletSelectorStyles.wselector}>
			{connectors.map((connector) => (
				<Button
					disabled={!connector.ready}
					key={connector.id}
					onClick={() => onConnect(connector)}
					loading={isConnecting &&
					connector.id === pendingConnector?.id}
					className={walletSelectorStyles.wbtn}
				>
				<span
					className={walletSelectorStyles.wicon}
				>
					<Image
						src={getWalletLogo(connector.name)}
						height={40}
						width={40}
						alt={connector.id}
					/>
				</span>
					<span>
					{connector.id === 'injected'
						? 'Browser Wallet'
						: connector.name}
						{!connector.ready && ' (unsupported)'}
				</span>
				</Button>
			))}
		</div>
	)
}
