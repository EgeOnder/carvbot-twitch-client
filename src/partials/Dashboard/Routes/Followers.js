import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';

import SwipeDrawer from '../SwipeDrawer';
import PermDrawer from '../PermDrawer';
import Navbar from '../../Navbar';

const Followers = () => {
	const [swipeOpen, setSwipeOpen] = useState(false);

	return (
		<>
			<Navbar onOpenChange={setSwipeOpen} />
			<div style={{ display: 'flex', width: '100%' }}>
				{isMobile ? (
					<SwipeDrawer open={swipeOpen} onOpenChange={setSwipeOpen} />
				) : (
					<PermDrawer />
				)}
				<div className="content"></div>
			</div>
		</>
	);
};

export default Followers;
