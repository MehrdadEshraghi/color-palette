import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import PaletteMetaForm from './PaletteMetaForm';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import useToggleState from '../hooks/useToggleState';
import styles from '../styles/PaletteFormNavStyles';

function PaletteFormNav({ classes, open, handleDrawerOpen, handleSubmit, palettes }) {
	const [ formShowing, toggleFormShowing ] = useToggleState(false);

	const showForm = () => {
		toggleFormShowing();
	};

	const hideForm = () => {
		toggleFormShowing();
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				color="default"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, open && classes.hide)}
					>
						<AddToPhotosIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						Create A Palette
					</Typography>
				</Toolbar>
				<div className={classes.navBtns}>
					<Link to="/">
						<Button className={classes.button} variant="contained" color="secondary">
							Go Back
						</Button>
					</Link>
					<Button className={classes.button} variant="contained" color="primary" onClick={showForm}>
						Save
					</Button>
				</div>
			</AppBar>
			{formShowing && <PaletteMetaForm handleSubmit={handleSubmit} palettes={palettes} hideForm={hideForm} />}
		</div>
	);
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
