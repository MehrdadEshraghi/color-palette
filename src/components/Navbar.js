import React, { useState } from 'react';
import Select from '@material-ui/core/Select';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from 'rc-slider';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/NavbarStyles';
import useToggleState from '../hooks/useToggleState';
import 'rc-slider/assets/index.css';

function Navbar({ handleChange, level, changeLevel, showingAllColors, classes }) {
	const [ format, setFormat ] = useState('hex');
	const [ open, toggleOpen ] = useToggleState(false);

	const handleFormatChange = (e) => {
		setFormat(e.target.value);
		toggleOpen();
		handleChange(e.target.value);
	};

	const closeSnackbar = () => {
		toggleOpen();
	};

	return (
		<header className={classes.Navbar}>
			<div className={classes.logo}>
				<Link to="/">colorpalette</Link>
			</div>
			{showingAllColors && (
				<div>
					<span>Level: {level}</span>
					<div className={classes.slider}>
						<Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={changeLevel} />
					</div>
				</div>
			)}
			<div className={classes.selectContainer}>
				<Select value={format} onChange={handleFormatChange}>
					<MenuItem value="hex">HEX - #ffffff</MenuItem>
					<MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
					<MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
				</Select>
			</div>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
				open={open}
				autoHideDuration={3000}
				message={<span id="message-id">Format Changed To {format.toUpperCase()}</span>}
				action={[
					<IconButton onClick={closeSnackbar} color="inherit" key="close" aria-label="close">
						<CloseIcon />
					</IconButton>
				]}
				onClose={closeSnackbar}
			/>
		</header>
	);
}

export default withStyles(styles)(Navbar);
