import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete';

function MiniPalette({ id, openDialog, goToPalette, classes, paletteName, emoji, colors }) {
	const deletePalette = (e) => {
		e.stopPropagation();
		openDialog(id);
	};

	const handleClick = () => {
		goToPalette(id);
	};

	const miniColorBoxes = colors.map((color) => (
		<div key={color.name} className={classes.miniColor} style={{ backgroundColor: color.color }} />
	));

	return (
		<div onClick={handleClick} className={classes.root}>
			<DeleteIcon
				onClick={deletePalette}
				style={{ transition: 'all 0.3s ease-in-out' }}
				className={classes.deleteIcon}
			/>
			<div className={classes.colors}>{miniColorBoxes}</div>
			<h5 className={classes.title}>
				{paletteName} <span className={classes.emoji}>{emoji}</span>
			</h5>
		</div>
	);
}
export default withStyles(styles)(MiniPalette);
