import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const SimpleButton = styled(Button)({
	boxShadow: 'none',
	textTransform: 'none',
	fontSize: 16,
	padding: '6px 12px',
	border: '1px solid',
	lineHeight: 1.5,
	backgroundColor: '#0063cc',
	borderColor: '#0063cc',
	color: 'white',
	fontFamily: 'Manrope',
	'&:hover': {
	  backgroundColor: '#0069d9',
	  borderColor: '#0062cc',
	  boxShadow: 'none',
	},
	'&:active': {
	  boxShadow: 'none',
	  backgroundColor: '#0062cc',
	  borderColor: '#005cbf',
	},
	'&:focus': {
	  boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
	},
});

export const SimpleOutlinedButton = styled(Button)({
	boxShadow: 'none',
	textTransform: 'none',
	fontSize: 16,
	padding: '6px 12px',
	border: '1px solid',
	lineHeight: 1.5,
	borderColor: '#0063cc',
	color: '#0063cc',
	fontFamily: 'Manrope',
	backgroundColor: 'white',
	'&:hover': {
		backgroundColor: 'white',
		borderColor: '#0062cc',
		boxShadow: 'none',
	},
	'&:active': {
		backgroundColor: 'white',
		boxShadow: 'none',
		borderColor: '#005cbf',
	},
	'&:focus': {
		backgroundColor: 'white',
		boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
	},
});
