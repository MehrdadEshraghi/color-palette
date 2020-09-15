import React, { Component } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/ColorPickerFormStyles';

class ColorPickerForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentColor: 'teal',
			newColorName: ''
		};
	}

	componentDidMount() {
		// Update the document title using the browser API
		ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
			this.props.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
		);
		ValidatorForm.addValidationRule('isColorUnique', (value) =>
			this.props.colors.every(({ color }) => color !== this.state.currentColor)
		);
	}

	updateColor = (newColor) => {
		this.setState({ currentColor: newColor.hex });
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = () => {
		const newColor = {
			color: this.state.currentColor,
			name: this.state.newColorName
		};
		this.props.addNewColor(newColor);
		this.setState({ newColorName: '' });
	};

	render() {
		const { paletteIsFull, classes } = this.props;
		const { currentColor, newColorName } = this.state;
		return (
			<div>
				<ChromePicker className={classes.picker} color={currentColor} onChange={this.updateColor} />
				<ValidatorForm instantValidate={false} onSubmit={this.handleSubmit}>
					<TextValidator
						validators={[ 'required', 'isColorNameUnique', 'isColorUnique' ]}
						errorMessages={[ 'Enter a color name', 'Color name must be unique', 'Color already used!' ]}
						value={newColorName}
						name="newColorName"
						className={classes.colorNameInput}
						onChange={this.handleChange}
						margin="normal"
						placeholder="Color Name"
						variant="filled"
					/>
					<Button
						disabled={paletteIsFull}
						type="submit"
						style={{ backgroundColor: paletteIsFull ? 'gray' : currentColor }}
						variant="contained"
						className={classes.addColor}
						color="primary"
					>
						{paletteIsFull ? 'Palette Full' : 'Add Color'}
					</Button>
				</ValidatorForm>
			</div>
		);
	}
}

export default withStyles(styles)(ColorPickerForm);
