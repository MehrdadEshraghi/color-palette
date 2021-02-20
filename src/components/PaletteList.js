import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import MiniPalette from './MiniPalette';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useToggleState from '../hooks/useToggleState';
import Button from '@material-ui/core/Button';
import styles from '../styles/PaletteListStyles';

function PaletteList({ history, deletePalette, palettes, classes }) {
	const [ deleteId, setDeleteId ] = useState('');
	const [ openDeleteDialog, toggleOpenDeleteDialog ] = useToggleState(false);

	const openDialog = (id) => {
		toggleOpenDeleteDialog();
		setDeleteId(id);
	};

	const closeDialog = () => {
		toggleOpenDeleteDialog();
		setDeleteId('');
	};

	const goToPalette = (id) => {
		history.push(`/palette/${id}`);
	};

	const handleDelete = () => {
		deletePalette(deleteId);
		closeDialog();
	};

	return (
		<div className={classes.root}>
			<div className={classes.container}>
				<nav className={classes.nav}>
					<h1 className={classes.heading}>Color Palette</h1>
					<Link to="/palette/new">
						<Button variant="contained" color="primary">
							Create Palette
						</Button>
					</Link>
				</nav>
				<h2 className={classes.description}>Create The Color Palette You Desire</h2>
				<TransitionGroup className={classes.palettes}>
					{palettes.map((palette) => (
						<CSSTransition key={palette.id} classNames="fade" timeout={500}>
							<MiniPalette
								openDialog={openDialog}
								goToPalette={goToPalette}
								{...palette}
								key={palette.id}
								id={palette.id}
							/>
						</CSSTransition>
					))}
				</TransitionGroup>
			</div>
			<Dialog open={openDeleteDialog} aria-labelledby="delete-dialog-title" onClose={closeDialog}>
				<DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
				<List>
					<ListItem button onClick={handleDelete}>
						<ListItemAvatar>
							<Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
								<CheckIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary="Delete" />
					</ListItem>
					<ListItem button onClick={closeDialog}>
						<ListItemAvatar>
							<Avatar style={{ backgroundColor: red[100], color: red[600] }}>
								<CloseIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary="Cancel" />
					</ListItem>
				</List>
			</Dialog>
		</div>
	);
}

export default withStyles(styles)(PaletteList);
