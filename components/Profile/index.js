import styles from './profile.module.scss';
import {Row, Col, Avatar, Typography, Space} from 'antd';

const {Title, Text} = Typography
import Label from "../UI/Label";
import {PUBLIC_URL} from "../../constants";
import {UnstoppableDomainsIcon, WorldCoinIcon} from '../Shared/Icons';

export default function Profile() {
	return (<div className={styles.profile}>
		<Row justify="flex-start" align="middle">
			<Col className={styles.avatarCol}>
				<Avatar size={100} src={`${PUBLIC_URL}/images/ava.png`} alt='Cybertron' className={styles.avatar}/>
			</Col>
			<Col>
				<Title level={1} className={styles.name}>
					Cybertron
					<sup><UnstoppableDomainsIcon className={styles[`name__icon`]}/><WorldCoinIcon className={styles[`name__icon`]} /></sup>
				</Title>
				<p className={styles.bio}>
					Everything about crypto in one place
				</p>
				<div className={styles.info}>
					<Space size={15}>
						<Label>cybertron.eth</Label>
						<Label className={styles.lensLabel}>cybertron.lens</Label>
					</Space>
					<div className={styles[`stats`]}>
						<span className={styles[`stats-item`]}>
							<span className={styles[`stats-item__number`]}>8234&nbsp;</span>
							<span className={styles[`stats-item__text`]}>followers</span>
						</span>
						<span className={styles[`stats-item`]}>
							<span className={styles[`stats-item__number`]}>1&nbsp;</span>
							<span className={styles[`stats-item__text`]}>following</span>
						</span>
					</div>
				</div>
			</Col>
		</Row>
	</div>)
}
