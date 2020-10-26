import React, { useState } from 'react';
import Navbar from './Navbar';
import { withStyles } from '@material-ui/core/styles';
import PaletteFooter from './PaletteFooter';
import { Link } from 'react-router-dom';
import styles from './styles/PaletteStyles';
import ColorBox from './ColorBox';

function SingleColorPalette({ classes, palette, colorId }) {
	const [ format, setFormat ] = useState('hex');

	const gatherShades = (palette, colorToFilterBy) => {
		let shades = [];
		let allColors = palette.colors;
		for (let key in allColors) {
			shades = shades.concat(allColors[key].filter((color) => color.id === colorToFilterBy));
		}
		return shades.slice(1);
	};

	const changeFormat = (format) => {
		setFormat(format);
	};
	SingleColorPalette._shades = gatherShades(palette, colorId);

	const { paletteName, emoji, id } = palette;
	const colorBoxes = SingleColorPalette._shades.map((color) => (
		<ColorBox key={color.name} name={color.name} background={color[format]} showingFullPalette={false} />
	));

	return (
		<div className={`${classes.Palette} SingleColorPalette`}>
			<Navbar handleChange={changeFormat} showingAllColors={false} />
			<div className={classes.colors}>
				{colorBoxes}
				<div className={classes.goBack}>
					<Link to={`/palette/${id}`}>GO BACK</Link>
				</div>
			</div>
			<PaletteFooter paletteName={paletteName} emoji={emoji} />
		</div>
	);
}

export default withStyles(styles)(SingleColorPalette);
