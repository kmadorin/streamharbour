import { createContext } from 'react'

const AppContext = createContext({
	web3auth: undefined,
	web3provider: undefined,
	etherspotSDK: undefined,
	provider: undefined,
	setProvider: () => {}
});

export default AppContext
