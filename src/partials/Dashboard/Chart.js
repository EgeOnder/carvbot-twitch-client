import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import React from 'react';

import followerData from './Cards/followerData.json';

const ViewerChart = () => {
	return (
		<LineChart height={300} width={300} data={followerData}>
			<Line type="monotone" dataKey="followerCount" stroke="#8884d8" />
			<CartesianGrid stroke="#ccc" />
			<XAxis dataKey="name" />
			<YAxis />
		</LineChart>
	);
};

export default ViewerChart;
