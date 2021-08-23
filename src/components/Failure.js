import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import Navbar from '../partials/Navbar';

const Failure = () => {
	const history = useHistory();

	const handleHomeButton = () => {
		history.push('/');
	};

	return (
		<>
			<Navbar />
			<div className="container">
				<div className="home-page-header">
					<div className="home-page-p">
						<p className="header-p">
							Oops, something went very wrong! Maybe try again?
						</p>
						<Button
							variant="contained"
							color="primary"
							style={{ marginTop: '32px' }}
							onClick={handleHomeButton}
						>
							Go back to Home
						</Button>
					</div>
					<img
						src={process.env.PUBLIC_URL + '/img/fail.svg'}
						alt="HomePage"
						className="home-page-svg"
					/>
				</div>
			</div>
		</>
	);
};

export default Failure;
