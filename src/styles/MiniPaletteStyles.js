export default {
	root: {
		backgroundColor: 'white',
		border: '1px solid black',
		borderRadious: '5px',
		padding: '0.5rem',
		position: 'relative',
		overflow: 'hidden',
		cursor: 'pointer',
		'&:hover svg': {
			opacity: '1'
		}
	},
	colors: {
		backgroundColor: '#dae1e4',
		height: '150px',
		width: '100%',
		borderRadius: '5px',
		overflow: 'hidden'
	},
	title: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: '0',
		color: 'black',
		paddingTop: '0.5rem',
		fontSize: '1rem'
	},
	emoji: {
		marginleft: '0.5rem',
		fontSize: '1.5rem'
	},
	miniColor: {
		height: '25%',
		width: '20%',
		display: 'inline-block',
		margin: '0 auto',
		position: 'relative',
		marginBottom: '-3.5px'
	},
	delete: {},
	deleteIcon: {
		color: 'white',
		backgroundColor: '#eb3b30',
		width: '20px',
		height: '20px',
		position: 'absolute',
		right: '0',
		top: '0',
		padding: '10px',
		zIndex: '10',
		opacity: '0'
	}
};
