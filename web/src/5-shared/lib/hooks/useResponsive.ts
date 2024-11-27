import {useMediaQuery} from '@mui/material';

export function useResponsive() {
	const isMobile = useMediaQuery('(max-width: 767px)');

	return {isMobile};
}
