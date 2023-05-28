import {PUBLIC_URL} from "../constants";

export default function getSocialLogo(name) {
	switch (name) {
		case 'Twitch':
			return `${PUBLIC_URL}/images/socials/twitch.svg`
		case 'Youtube':
			return `${PUBLIC_URL}/images/socials/youtube.svg`
		case 'Twitter':
			return `${PUBLIC_URL}/images/socials/twitter.svg`
		case 'Google':
			return `${PUBLIC_URL}/images/socials/google.svg`
	}
}
