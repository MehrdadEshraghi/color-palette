import React, { useState } from 'react';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/PaletteStyles';
import Navbar from './Navbar';

function Palette({ classes, palette }) {
	const [ level, setLevel ] = useState(500);
	const [ format, setFormat ] = useState('hex');
	const { colors, paletteName, emoji, id } = palette;

	const changeLevel = (level) => {
		setLevel(level);
	};

	const changeFormat = (format) => {
		setFormat(format);
	};

	const colorBoxes = colors[level].map((color) => (
		<ColorBox
			key={color.id}
			background={color[format]}
			name={color.name}
			moreUrl={`/palette/${id}/${color.id}`}
			showingFullPalette
		/>
	));
	return (
		<div className={classes.Palette}>
			<Navbar level={level} changeLevel={changeLevel} handleChange={changeFormat} showingAllColors />
			<div className={classes.colors}>{colorBoxes}</div>
			<PaletteFooter paletteName={paletteName} emoji={emoji} />
		</div>
	);
}

export default withStyles(styles)(Palette);
