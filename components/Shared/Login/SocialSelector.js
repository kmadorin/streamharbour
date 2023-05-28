import {Button} from 'antd';
import {useContext} from 'react';
import getSocialLogo from "../../../lib/getSocialLogo";
import walletSelectorStyles from './wselector.module.scss';
import Image from 'next/image';
import AppContext from "../../utils/AppContext";
import {WALLET_ADAPTERS} from "@web3auth/base";

export default function SocialSelector({setHasConnected}) {
	const {web3auth, setProvider} = useContext(AppContext);

	const handleLogin = (social) => {
		return (e) => {
			// login_hint is optional parameter which accepts any string and can be set to null
			web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
				loginProvider: social.toLowerCase(),
			}).then(web3authProvider => {
				setProvider(web3authProvider);
				setHasConnected(true);

			}).catch(error => {
				console.log(`Failed to login! Reason: ${error instanceof Error && error?.message ? error.message : 'unknown'}.`)

			});
		}
	}

	const socials = ['Google', 'Twitch', 'Youtube'];

	return (
		<div className={walletSelectorStyles.wselector}>
			{socials.map((social) => (
				<Button
					key={social}
					onClick={handleLogin(social)}
					className={walletSelectorStyles.wbtn}
				>
				<span
					className={walletSelectorStyles.wicon}
				>
					<Image
						src={getSocialLogo(social)}
						height={50}
						width={50}
						alt={social}
					/>
				</span><span>Login with {social}</span>
				</Button>
			))}
		</div>
	)
}
