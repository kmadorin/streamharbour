import Label from '../../UI/Label';

function Address({value, size = 'long'}) {
	let displayAddress = value.substr(0, 6);

	if (size === "short") {
		displayAddress += "..." + value.substr(-4);
	} else if (size === "long") {
		displayAddress = value;
	}

	return (
		<Label>{displayAddress}</Label>
	)
}

export default Address
