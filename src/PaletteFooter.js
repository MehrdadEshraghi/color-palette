import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/PaletteFooterStyles';

function PaletteFooter({ paletteName, emoji, classes }) {
	return (
		<footer className={classes.PaletteFooter}>
			{paletteName}
			<span className={classes.emoji}>{emoji}</span>
		</footer>
	);
}

export default withStyles(styles)(PaletteFooter);
