import sizes from './sizes';
import bg from './bg.svg';

export default {
	'@global': {
		'.fade-exit': {
			opacity: '1'
		},
		'.fade-exit-active': {
			opacity: '0',
			transition: 'opacity 500ms ease-out'
		}
	},
	root: {
		height: '100vh',
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'center',
		/* background by SVGBackgrounds.com */
		backgroundColor: '#185aaa',
		backgroundImage: `url(${bg})`,
		overflow: 'scroll'
	},
	container: {
		width: '50%',
		display: 'flex',
		alignItems: 'flex-start',
		flexDirection: 'column',
		flexWrap: 'wrap',
		[sizes.down('xl')]: {
			width: '80%'
		},
		[sizes.down('xs')]: {
			width: '75%'
		}
	},
	nav: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		color: 'white',
		'& a': {
			color: 'white',
			textDecoration: 'none'
		}
	},
	palettes: {
		boxSizing: 'border-box',
		width: '100%',
		display: 'grid',
		gridTemplateColumns: 'repeat(3, 30%)',
		gridGap: '2.5rem',
		[sizes.down('md')]: {
			gridTemplateColumns: 'repeat(2, 50%)'
		},
		[sizes.down('xs')]: {
			gridTemplateColumns: 'repeat(1, 100%)',
			gridGap: '1.4rem'
		}
	},
	heading: {
		fontSize: '2rem',
		letterSpacing: 2,
		marginBottom: 0
	},
	description: {
		marginTop: 0,
		letterSpacing: 2,
		color: '#482880',
		fontWeight: 300
	}
};
