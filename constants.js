import { chain } from 'wagmi';

// Environments
export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
export const IS_MAINNET = process.env.NEXT_PUBLIC_IS_MAINNET === 'true'
export const APP_NAME = 'Streamharbour';

// Messages
export const ERROR_MESSAGE = 'Something went wrong!'
export const ERRORS = {
	notMined:
		'A previous transaction may not been mined yet or you have passed in a invalid nonce. You must wait for that to be mined before doing another action, please try again in a few moments. Nonce out of sync.'
}

export const CONNECT_WALLET = 'Please connect your wallet.'
export const WRONG_NETWORK = IS_MAINNET
	? 'Please change network to Polygon mainnet.'
	: 'Please change network to Polygon Mumbai testnet.'
export const SIGN_ERROR = 'Failed to sign data'

//IPFS Gateway
export const INFURA_IPFS_PROJECT_ID = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID;
export const INFURA_IPFS_API_SECRET_KEY = process.env.NEXT_PUBLIC_INFURA_IPFS_API_SECRET_KEY;

//URLS
export const PUBLIC_URL = process.env.NODE_ENV==='production' ? process.env.NEXT_PUBLIC_URL : process.env.NEXT_PUBLIC_URL_DEV

// Web3
export const ALCHEMY_KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY
export const ALCHEMY_RPC = IS_MAINNET
	? `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`
	: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_KEY}`

export const POLYGON_MAINNET = {
	...chain.polygon,
	name: 'Polygon Mainnet',
	rpcUrls: { default: 'https://polygon-rpc.com' }
}
export const POLYGON_MUMBAI = {
	...chain.polygonMumbai,
	name: 'Polygon Mumbai',
	rpcUrls: { default: 'https://rpc-mumbai.maticvigil.com' }
}
export const CHAIN_ID = IS_MAINNET ? POLYGON_MAINNET.id : POLYGON_MUMBAI.id

export const TOKEN_LIST_URI = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org';
// export const TOKEN_LIST_MUMBAI_URI = 'https://raw.githubusercontent.com/viaprotocol/tokenlists/main/tokenlists/mumbai.json';

export const WEB3_AUTH_CLIENT_ID = process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID;

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
