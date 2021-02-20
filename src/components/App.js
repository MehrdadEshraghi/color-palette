import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';

import seedColors from '../utils/seedColors';
import { generatePalette } from '../utils/colorHelpers';

import Page from './Page';

function App() {
	const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
	const [ palettes, setPalettes ] = useState(savedPalettes || seedColors);
	useEffect(
		() => {
			const syncLocalStorage = () => {
				window.localStorage.setItem('palettes', JSON.stringify(palettes));
			};
			syncLocalStorage();
		},
		[ palettes ]
	);

	const findPalette = (id) => {
		return palettes.find(function(palette) {
			return palette.id === id;
		});
	};

	const deletePalette = (id) => {
		setPalettes(palettes.filter((palette) => palette.id !== id));
	};

	const savePalette = (newPalette) => {
		setPalettes([ ...palettes, newPalette ]);
	};

	return (
		<Route
			render={({ location }) => (
				<TransitionGroup>
					<CSSTransition key={location.key} classNames="page" timeout={500}>
						<Switch location={location}>
							<Route
								exact
								path="/palette/new"
								render={(routeProps) => (
									<Page>
										<NewPaletteForm savePalette={savePalette} palettes={palettes} {...routeProps} />
									</Page>
								)}
							/>
							<Route
								exact
								path="/"
								render={(routeProps) => (
									<Page>
										<PaletteList
											palettes={palettes}
											deletePalette={deletePalette}
											{...routeProps}
										/>
									</Page>
								)}
							/>
							<Route
								exact
								path="/palette/:id"
								render={(routeProps) => (
									<Page>
										<Palette palette={generatePalette(findPalette(routeProps.match.params.id))} />
									</Page>
								)}
							/>
							<Route
								exact
								path="/palette/:paletteId/:colorId"
								render={(routeProps) => (
									<Page>
										<SingleColorPalette
											colorId={routeProps.match.params.colorId}
											palette={generatePalette(findPalette(routeProps.match.params.paletteId))}
										/>
									</Page>
								)}
							/>
							<Route
								render={(routeProps) => (
									<Page>
										<PaletteList
											palettes={palettes}
											deletePalette={deletePalette}
											{...routeProps}
										/>
									</Page>
								)}
							/>
						</Switch>
					</CSSTransition>
				</TransitionGroup>
			)}
		/>
	);
}

export default App;
