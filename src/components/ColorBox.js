import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from '../styles/ColorBoxStyles';
import useToggleState from '../hooks/useToggleState';

function ColorBox({ name, background, moreUrl, showingFullPalette, classes }) {
	const [ copied, toggleCopied ] = useToggleState(false);
	const [ flag, setFlag ] = useState(0);
	useEffect(
		() => {
			if (flag) {
				let timerId = setTimeout(() => toggleCopied(), 1500);
				setFlag(0);
				return () => {
					clearTimeout(timerId);
				};
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ copied ]
	);
	const changeCopyState = () => {
		toggleCopied();
		setFlag(1);
	};

	return (
		<CopyToClipboard text={background} onCopy={changeCopyState}>
			<div style={{ background }} className={classes.ColorBox}>
				<div
					style={{ background }}
					className={classNames(classes.copyOverlay, {
						[classes.showOverlay]: copied
					})}
				/>
				<div
					className={classNames(classes.copyMessage, {
						[classes.showMessage]: copied
					})}
				>
					<h1>copied</h1>
					<p className={classes.copyText}>{background}</p>
				</div>
				<div>
					<div className={classes.boxContent}>
						<span className={classes.colorName}>{name}</span>
					</div>
					<button className={classes.copyButton}>Copy</button>
				</div>
				{showingFullPalette && (
					<Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
						<span className={classes.seeMore}>MORE</span>
					</Link>
				)}
			</div>
		</CopyToClipboard>
	);
}

export default withStyles(styles)(ColorBox);
