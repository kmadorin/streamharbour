import Icon from '@ant-design/icons';

const UnstoppableDomainsSvg = () => (
	<svg
		width={21}
		height={20}
		fill="none"
		viewBox="0 0 21 20"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			opacity={0.4}
			d="M20.87 1.197v7.196L0 16.898 20.87 1.197Z"
			fill="#000"
		/>
		<path
			d="M16.957.87V13.3c0 3.613-2.92 6.542-6.522 6.542-3.602 0-6.522-2.93-6.522-6.542V8.066l3.913-2.159V13.3c0 .607.24 1.19.669 1.619a2.279 2.279 0 0 0 3.228 0c.428-.43.668-1.012.668-1.62V3.39l4.566-2.52Z"
			fill="#000"
		/>
	</svg>
);

export const UnstoppableDomainsIcon = (props) => (
	<Icon component={UnstoppableDomainsSvg} {...props} />
);

const WorldCoinSvg = () => (
	<svg
		width={22}
		height={20}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 22 20"
	>
		<g clipPath="url(#a)">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M10.092 7.338a.32.32 0 0 1-.212.088.286.286 0 0 1-.251-.113C8.632 6.023 7.922.623 10.07.07c2.401-.59 3.376 2.854 3.826 4.445l.073.252a6.333 6.333 0 0 0-3.483-.84 55.994 55.994 0 0 0-.295 3.206.32.32 0 0 1-.1.207Zm2.397.547a.312.312 0 0 0 .415.052 61.354 61.354 0 0 1 2.686-1.793 6.387 6.387 0 0 1 1.533 3.24l.155-.22c.957-1.355 3.014-4.27 1.041-5.768-1.786-1.325-5.528 2.635-5.9 4.212a.303.303 0 0 0 .07.277Zm1.454 2.106a.322.322 0 0 0-.168.356.32.32 0 0 0 .212.234c.692.208 1.862.562 3.075.988a6.343 6.343 0 0 1-1.585 3.222l.3-.019c1.67-.104 5.19-.322 5.14-2.78-.078-2.217-5.501-2.686-6.974-2.001Zm-1.061 2.654c.05 0 .098.01.143.032 1.455.72 4.461 5.26 2.781 6.708-1.907 1.57-4.284-1.086-5.39-2.32l-.18-.202s1.688.216 3.5-.763a53.937 53.937 0 0 0-1.145-3.023.322.322 0 0 1 .147-.4.328.328 0 0 1 .144-.032Zm-2.525.976a.303.303 0 0 0-.182-.216.313.313 0 0 0-.399.138c-.529.937-1.08 1.862-1.654 2.773a6.343 6.343 0 0 1-2.782-2.27l-.043.262c-.277 1.633-.875 5.157 1.542 5.665 2.184.425 3.856-4.757 3.518-6.351Zm-2.342-1.623a.32.32 0 0 1-.058.133C6.926 13.388 1.823 15.294.8 13.327-.316 11.11 2.827 9.385 4.274 8.59l.225-.125a6.396 6.396 0 0 0-.043 3.588 66.754 66.754 0 0 0 3.197-.433.312.312 0 0 1 .356.234.316.316 0 0 1 .006.145Zm-.388-2.683a.295.295 0 0 0 .251-.13.303.303 0 0 0-.035-.416 56.28 56.28 0 0 1-2.33-2.236 6.342 6.342 0 0 1 2.833-2.2l-.267-.11c-1.539-.638-4.814-1.995-5.85.239-.901 2.028 3.778 4.826 5.398 4.853Z"
				fill="#000"
			/>
		</g>
		<defs>
			<clipPath id="a">
				<path fill="#fff" transform="translate(.565)" d="M0 0h20.87v20H0z" />
			</clipPath>
		</defs>
	</svg>
);

export const WorldCoinIcon = (props) => (
	<Icon component={WorldCoinSvg} {...props} />
);

const LogoutSvg = () => (
	<svg
		width={16}
		height={16}
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M7.997 1H1v14h7M11.5 11.5 15 8l-3.5-3.5M4.889 7.997H15"
			stroke="#000"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export const LogoutIcon = (props) => (
	<Icon component={LogoutSvg} {...props} />
);

const ArrowDownSvg = () => (
	<svg
		width={14}
		height={8}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 14 8"
	>
		<path
			d="M13 1 7 7 1 1"
			stroke="#000"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export const ArrowDownIcon = (props) => (
	<Icon component={ArrowDownSvg} {...props} />
);
