import React, { useState } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import styles from '../styles/NewPaletteFormStyles';
import useToggleState from '../hooks/useToggleState';
import seedColors from '../utils/seedColors';

function NewPaletteForm({ classes, maxColors, palettes, savePalette, history }) {
	NewPaletteForm.defaultProps = {
		maxColors: 20
	};
	const [ colors, setColors ] = useState(seedColors[0].colors);
	const [ open, toggleOpen ] = useToggleState(true);

	const handleDrawerOpen = () => {
		toggleOpen();
	};

	const handleDrawerClose = () => {
		toggleOpen();
	};

	const addNewColor = (newColor) => {
		setColors([ ...colors, newColor ]);
	};

	const clearColors = () => {
		setColors([]);
	};

	const addRandomColor = () => {
		const colorNames = [];
		for (let color of colors) colorNames.push(color.name);
		const allColors = palettes.map((p) => p.colors).flat();
		let rand;
		let randomColor;
		let isDuplicateColor = true;
		const colorsSet = new Set(colorNames);
		while (isDuplicateColor) {
			rand = Math.floor(Math.random() * allColors.length);
			randomColor = allColors[rand];
			console.log(randomColor.name);
			if (!colorsSet.has(randomColor.name)) isDuplicateColor = false;
		}
		setColors([ ...colors, randomColor ]);
	};

	const handleSubmit = (newPalette) => {
		newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
		newPalette.colors = colors;
		savePalette(newPalette);
		history.push('/');
	};

	const removeColor = (colorName) => {
		setColors(colors.filter((color) => color.name !== colorName));
	};

	const onSortEnd = ({ oldIndex, newIndex }) => {
		setColors(arrayMove(colors, oldIndex, newIndex));
	};

	const paletteIsFull = colors.length >= maxColors;
	return (
		<div className={classes.root}>
			<PaletteFormNav
				open={open}
				palettes={palettes}
				handleSubmit={handleSubmit}
				handleDrawerOpen={handleDrawerOpen}
			/>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<div className={classes.container}>
					<Typography variant="h4" gutterBottom>
						Design Your Palette
					</Typography>
					<div className={classes.buttons}>
						<Button variant="contained" color="secondary" onClick={clearColors} className={classes.button}>
							Clear Palette
						</Button>
						<Button
							variant="contained"
							className={classes.button}
							color="primary"
							onClick={addRandomColor}
							disabled={paletteIsFull}
						>
							Random Color
						</Button>
					</div>
					<ColorPickerForm paletteIsFull={paletteIsFull} addNewColor={addNewColor} colors={colors} />
				</div>
			</Drawer>
			<main
				className={classNames(classes.content, {
					[classes.contentShift]: open
				})}
			>
				<div className={classes.drawerHeader} />
				<DraggableColorList
					colors={colors}
					removeColor={removeColor}
					axis="xy"
					onSortEnd={onSortEnd}
					distance={20}
				/>
			</main>
		</div>
	);
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);
