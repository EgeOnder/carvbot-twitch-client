import React from 'react';

import { Button } from '@material-ui/core';
import '../css/index.scss';

const Header = () => {
	return (
		<div className="background">
			<div className="container">
				<div className="home-page-header">
					<div className="home-page-p">
						<p className="header-p">
							A free moderation solution for your channels.
						</p>
						<Button
							variant="contained"
							color="primary"
							style={{ marginTop: '32px' }}
						>
							Get started for Free
						</Button>
					</div>
					<img
						src={
							process.env.REACT_APP_PUBLIC_URL +
							'/img/home_page.svg'
						}
						alt="HomePage"
						className="home-page-svg"
					/>
				</div>
			</div>
		</div>
	);
};

export default Header;
