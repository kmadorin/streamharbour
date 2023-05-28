import {Form, Typography, Input, Select, Button} from 'antd';
import {Token} from '@uniswap/sdk';
import toast from "react-hot-toast";

const {Option} = Select;
import {useContext, useEffect, useState} from 'react';

const {Title} = Typography;
const {TextArea} = Input;
import styles from './donationForm.module.scss';
import {ArrowDownIcon} from '../Shared/Icons';
import clsx from 'clsx';
import {
	useContract,
	useContractEvent,
	useSigner,
	usePrepareSendTransaction,
	useSendTransaction,
	useAccount,
	useBalance,
	erc20ABI,
	useContractRead,
	useEnsAddress,
	useEnsAvatar,
	useEnsName
} from "wagmi";
import {BigNumber, ethers} from "ethers";
import uploadToIPFS from "../../lib/uploadToIPFS";
import StreamharbourContract from '../../deployments/mumbai/Streamharbour.json';
import {ZERO_ADDRESS} from "../../constants";

import {
	PUBLIC_URL,
	CHAIN_ID
} from '../../constants';
import AppContext from "../utils/AppContext";

export default function DonationForm() {
	const {etherspotSDK} = useContext(AppContext);
	const {data: signer} = useSigner();
	const {address, isConnecting, isDisconnected} = useAccount();
	const [isEtherspotAccountConnected, setIsEtherspotAccountConnected] = useState(false);
	const [isSendingTransaction, setIsSendingTransaction] = useState(false);
	const [tokenList, setTokenList] = useState([])
	const [tokens, setTokens] = useState([]);
	const [nativeToken, setNativeToken] = useState(null);
	const [token, setToken] = useState();
	const [user, setUser] = useState('');
	const [message, setMessage] = useState('');
	const [amount, setAmount] = useState(0);
	const [transactionData, setTransactionData] = useState(null);
	const [path, setPath] = useState('');
	const [donationForm] = Form.useForm();
	const nativeBalance = useBalance({
		addressOrName: address
	});
	const tokenBalance = useBalance({
		addressOrName: address,
		token: token?.address
	});

	// console.log(`###: tokenBalance`, tokenBalance);

	const MAX_MESSAGE_LENGTH = 255;

	// const streamerAddress = '0x9e0f0d83dD880240e3506A7Ac4CE82500b2bD92B';

	const { data: streamerName, } = useEnsName({
		address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
		chainId: 1,
	})

	// console.log(`###: streamerName`, streamerName);


	const { data: streamerAddress } = useEnsAddress({
		name: 'petermdenton.eth',
		chainId: 1,
	})

	const { data:streamerAvatar} = useEnsAvatar({
		addressOrName: 'brantly.eth',
		chainId: 1,
	});

	// console.log(`###: streamerAddress`, streamerAddress)
	// console.log(`###: streamerAvatar`, streamerAvatar);

	const {config: sendNativeTransactionConfig} = usePrepareSendTransaction({
		request: {
			to: streamerAddress,
			value: amount && typeof amount === 'number' ? ethers.utils.parseEther(amount.toString()) : 0,
			data: transactionData
		},
	})

	const {
		data: sendNativeTransactionData,
		isLoading: isSendNativeTransactionLoading,
		isSuccess: isSendNativeTransactionSuccess,
		sendTransactionAsync
	} =
		useSendTransaction(sendNativeTransactionConfig)


	const tokenContract = useContract({
		addressOrName: token?.address || ZERO_ADDRESS,
		contractInterface: erc20ABI,
		signerOrProvider: signer
	})

	const streamHarbourContract = useContract({
		addressOrName: StreamharbourContract.address,
		contractInterface: StreamharbourContract.abi,
		signerOrProvider: signer
	})

	const {data: tokenAllowance, isError, isLoading} = useContractRead({
		addressOrName: token?.address,
		contractInterface: erc20ABI,
		functionName: 'allowance',
		args: [address, StreamharbourContract.address]
	})

	useContractEvent({
		addressOrName: StreamharbourContract.address,
		contractInterface: StreamharbourContract.abi,
		eventName: 'DonationNative',
		listener: (event) => console.log('Donation Native', event),
	})

	useContractEvent({
		addressOrName: StreamharbourContract.address,
		contractInterface: StreamharbourContract.abi,
		eventName: 'Donation',
		listener: (event) => console.log('Donation', event),
	})

	function tokenListToObject(array) {
		return array.reduce((obj, item) => {
			obj[item.symbol] = new Token(item.chainId, item.address, item.decimals, item.symbol, item.name)
			return obj
		}, {})
	}

	async function getNativeToken() {
		const chains = await fetch(`${PUBLIC_URL}/chains.json`);
		const chainsJson = await chains.json();
		const chainInfo = chainsJson.find(chain => chain.chainId === CHAIN_ID);
		const nativeToken = chainInfo && chainInfo.nativeCurrency;

		return nativeToken;
	}

	async function getTokenList() {
		try {

			const tokenList = await fetch(`${PUBLIC_URL}/tokenlists/streamharbour.tokenlist.json`)
			const tokenListJson = await tokenList.json()
			const filteredTokens = tokenListJson.tokens.filter(function (t) {
				return t.chainId === CHAIN_ID
			})

			const _tokens = tokenListToObject(filteredTokens);
			setTokens(_tokens)


			return filteredTokens;
		} catch (e) {
			console.log(e)
		}
	}

	function onUserNameChanged(e) {
		setUser(e.target.value);
	}

	function resetForm() {
		donationForm.resetFields();
		setAmount(0);
		donationForm.setFieldValue('currency', `Select token`)
		setMessage('');
		setUser('');
		setToken('');
	}

	async function sendTip(values) {
		const {user, currency, message} = values;
		setIsSendingTransaction(true);

		const messageData = {
			user,
			message,
			createdAt: new Date()
		}
		const {path} = await uploadToIPFS(messageData);

		if (currency === 'native') {
			const data = ethers.utils.defaultAbiCoder.encode(
				["address", "string"],
				[streamerAddress, path]
			);

			setTransactionData(data)

			try {
				const value = amount && typeof amount === 'number' ? ethers.utils.parseEther(amount.toString()) : 0;
				await etherspotSDK.batchExecuteAccountTransaction({
					to: StreamharbourContract.address,
					value,
					data
				});

				await etherspotSDK.estimateGatewayBatch({
					to: StreamharbourContract.address,
					value: amount && typeof amount === 'number' ? ethers.utils.parseEther(amount.toString()) : 0,
					data
				});

				const submissionResponse = await etherspotSDK
					.submitGatewayBatch()

				toast.success('Your tip has been successfully send!')
				console.log(`###: submissionResponse`, submissionResponse);
			} catch (e) {
				console.log(e);
				toast.error('Something went wrong');
			} finally {
				resetForm();
			}

		} else {
			// check allowance

			const parsedAmount = ethers.utils.parseUnits(amount.toString(), token.decimals)

			let approveTxData = tokenContract.interface.encodeFunctionData('approve', [streamHarbourContract.address, parsedAmount]);
			let donateTxData = streamHarbourContract.interface.encodeFunctionData('donate', [streamerAddress, token?.address, parsedAmount, path]);
			console.log(`###: donateTxData`, donateTxData);
			console.log(`###: approveTxData`, approveTxData);

			try {
				const value = amount && typeof amount === 'number' ? ethers.utils.parseEther(amount.toString()) : 0;
				await etherspotSDK.batchExecuteAccountTransaction({
					to: token.address,
					data: approveTxData
				});

				await etherspotSDK.batchExecuteAccountTransaction({
					to: StreamharbourContract.address,
					data: donateTxData
				});

				await etherspotSDK.estimateGatewayBatch();

				const submissionResponse = await etherspotSDK
					.submitGatewayBatch()

				toast.success('Your tip has been successfully send!')
				console.log(`###: submissionResponse`, submissionResponse);
			} catch (e) {
				console.log(e);
				toast.error('Something went wrong');
			} finally {
				resetForm();
			}
		}

		setIsSendingTransaction(false);

	}

	function onMessageChange(e) {
		setMessage(e.target.value);
	}

	function handleAmountChange(e) {
		setAmount(Number(e.target.value));
	}

	function handleTokenChange(tokenSymbol) {
		if (tokenSymbol === 'native') {
			setToken(nativeToken);
		} else {
			setToken(tokens[tokenSymbol]);
		}
	}

	useEffect(() => {
		getTokenList().then((tokenList) => {
			if (tokenList.length > 0) {
				setTokenList(tokenList)
				donationForm.setFieldValue('currency', `Select token`)
			}
		}).catch(e => {
			console.log(e);
		});

		getNativeToken().then(token => setNativeToken(token));

	}, [donationForm])

	useEffect(() => {
		const state = etherspotSDK && etherspotSDK.state;

		if (state) {
			const {account} = state;
			if (account.address) {
				setIsEtherspotAccountConnected(true);
			}
		}
	}, [etherspotSDK]);

	return (
		<Form form={donationForm} requiredMark={false} onFinish={sendTip} className={styles.form}>
			<Title level={2}>Buy me a beer</Title>
			<Form.Item
				name="user"
			>
				<Input

					placeholder="Your name" onChange={onUserNameChanged}
					value={user}
				/>
			</Form.Item>
			<div className={styles.currency}>
				<Form.Item
					className={styles[`currency__select`]}
					name="currency"
				>
					<Select
						style={{
							width: 170,
						}}
						size="large"
						suffixIcon={<ArrowDownIcon style={{pointerEvents: 'none'}}/>}
						onChange={handleTokenChange}
						showSearch
						className={clsx(styles.select, !token && styles[`select--default`])}
					>
						{nativeToken && <Option value='native'>{nativeToken.symbol}</Option>}
						{tokenList.map(token => (
							<Option key={token.symbol} value={token.symbol}>{token.symbol}</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item
					className={styles[`currency__input`]}
					name="amount"
				>
					<Input
						placeholder="0" onChange={handleAmountChange}
						value={amount}
						required
					/>
				</Form.Item>
			</div>

			<Form.Item
				className={styles.message}
			>
				<Form.Item name='message' className={styles[`message__item`]}><TextArea
					placeholder="Message"
					maxLength={MAX_MESSAGE_LENGTH}
					onChange={onMessageChange} value={message}
					className={styles[`message__input`]}
					autoSize={{minRows: 2}}
				/></Form.Item>
				<span className={styles[`message__counter`]}>{`${message.length} / ${MAX_MESSAGE_LENGTH}`}</span>
			</Form.Item>

			<Button
				disabled={!token || !amount || !isEtherspotAccountConnected || isSendingTransaction}
				type="primary"
				htmlType="submit"
				className={styles.paybtn}
				size="large"
				block
			>
				<span>{
					isSendingTransaction ? 'Sending transaction ...' :
						!isEtherspotAccountConnected ? 'Connect Wallet' :
							token ? (
								amount ? `Donate ${amount} ${token.symbol}` : 'Enter amount'
							) : `Select a token`}</span>
				{/*<span>~ 410.73 USD</span>*/}
			</Button>
		</Form>
	)
}
