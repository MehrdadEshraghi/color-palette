import sizes from './sizes';
export default {
	Palette: {
		height: '100vh',
		display: 'flex',
		flexDirection: 'column'
	},
	colors: {
		height: '90%'
	},
	goBack: {
		width: '20%',
		height: '50%',
		margin: '0 auto',
		display: 'inline-block',
		position: 'relative',
		cursor: 'pointer',
		marginBottom: '-4px',
		opacity: '1',
		backgroundColor: 'black',
		'& a': {
			color: 'white',
			width: '100px',
			height: '30px',
			position: 'absolute',
			display: 'inline-block',
			top: '50%',
			left: '50%',
			marginLeft: '-50px',
			marginTop: '-15px',
			outline: 'none',
			fontSize: '1rem',
			textAlign: 'center',
			background: 'rgba(255, 255, 255, 0.3)',
			textTransform: 'uppercase',
			border: 'none',
			textDecoration: 'none',
			lineHeight: 1.5
		},
		[sizes.down('lg')]: {
			width: '25%',
			height: '33.3333%'
		},
		[sizes.down('md')]: {
			width: '50%',
			height: '20%'
		},
		[sizes.down('xs')]: {
			width: '100%',
			height: '10%'
		}
	}
};
