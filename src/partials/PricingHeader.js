import React from 'react';

import { Typography, Divider, Button } from '@material-ui/core';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import StarIcon from '@material-ui/icons/Star';
import ReceiptIcon from '@material-ui/icons/Receipt';

import FeaturesCard from './FeaturesCard';

import '../css/index.scss';

const pricing = [
	{
		title: (
			<Button variant="text" color="inherit" startIcon={<MoneyOffIcon />}>
				Free
			</Button>
		),
		subtitle: '',
		details: (
			<>
				<Divider />
				<div
					style={{
						display: 'flex',
						marginTop: '20px',
						marginBottom: '20px',
					}}
				>
					<Typography variant="h3">$0</Typography>
					<Typography variant="h6" style={{ marginTop: '20px' }}>
						/mo
					</Typography>
				</div>
				<div>
					<Typography
						variant="body1"
						className="pricing-card-features"
					>
						Easy giveaways
					</Typography>
					<Typography
						variant="body1"
						className="pricing-card-features"
					>
						Up to 300 users at once
					</Typography>
				</div>
				<Button
					variant="contained"
					color="primary"
					style={{ marginTop: '24px' }}
				>
					Get started now
				</Button>
			</>
		),
		type: 'card',
	},
	{
		title: (
			<Button variant="text" color="inherit" startIcon={<StarIcon />}>
				Pro
			</Button>
		),
		subtitle: 'Most Popular',
		details: (
			<>
				<Divider />
				<div
					style={{
						display: 'flex',
						marginTop: '20px',
						marginBottom: '20px',
					}}
				>
					<Typography variant="h3">$10</Typography>
					<Typography variant="h6" style={{ marginTop: '20px' }}>
						/mo
					</Typography>
				</div>
				<div>
					<Typography
						variant="body1"
						className="pricing-card-features"
					>
						Easy giveaways
					</Typography>
					<Typography
						variant="body1"
						className="pricing-card-features"
					>
						Up to 5,000 users at once
					</Typography>
				</div>
				<Button
					variant="contained"
					color="primary"
					style={{ marginTop: '24px' }}
				>
					Purchase now
				</Button>
			</>
		),
		type: 'card',
	},
	{
		title: (
			<Button variant="text" color="inherit" startIcon={<ReceiptIcon />}>
				Enterprise
			</Button>
		),
		subtitle: '',
		details: (
			<>
				<Divider />
				<div
					style={{
						display: 'flex',
						marginTop: '20px',
						marginBottom: '20px',
					}}
				>
					<Typography variant="h3">$50</Typography>
					<Typography variant="h6" style={{ marginTop: '20px' }}>
						/mo
					</Typography>
				</div>
				<div>
					<Typography
						variant="body1"
						className="pricing-card-features"
					>
						Easy giveaways
					</Typography>
					<Typography
						variant="body1"
						className="pricing-card-features"
					>
						Up to 100,000 users at once
					</Typography>
				</div>
				<Button
					variant="contained"
					color="primary"
					style={{ marginTop: '24px' }}
				>
					Contact us
				</Button>
			</>
		),
		type: 'card',
	},
];

const PricingHeader = () => {
	return (
		<div className="background">
			<div className="container">
				<div className="pricing-cards">
					{pricing.map((price) => (
						<div className="pricing-item" key={price.title}>
							<FeaturesCard
								key={price.title}
								title={price.title}
								subtitle={price.subtitle}
								icon={price.icon}
								details={price.details}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default PricingHeader;
