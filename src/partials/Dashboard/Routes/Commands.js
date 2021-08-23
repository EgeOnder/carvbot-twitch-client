import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import {
	Button,
	DialogTitle,
	Dialog,
	DialogActions,
	DialogContent,
	TextField,
	DialogContentText,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SettingsIcon from '@material-ui/icons/Settings';

import SwipeDrawer from '../SwipeDrawer';
import PermDrawer from '../PermDrawer';
import Navbar from '../../Navbar';
import CommandTable from '../CommandTable';
import Loading from '../../Loading';
import ReactHookFormSelect from '../SelectModal';
import AlertComponent from '../../AlertComponent';

const special = [
	{
		value: 'none',
		label: 'Select a special event',
	},
	{
		value: 'uptime',
		label: 'Return Uptime',
	},
	{
		value: 'followage',
		label: 'Return Follow Age',
	},
	{
		value: 'spotify',
		label: 'Spotify Current Song (Requires Spotify integration)',
	},
];

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const Commands = () => {
	const [swipeOpen, setSwipeOpen] = useState(false);
	const [commands, setCommands] = useState(null);
	const [prefix, setPrefix] = useState(null);
	const [open, setOpen] = useState(false);
	const [specialEvent, setSpecialEvent] = useState('none');
	const [user, setUser] = useState(null);
	const [prefixOpen, setPrefixOpen] = useState(false);

	const { handleSubmit, control } = useForm();
	const query = useQuery();

	const handleChange = (event) => {
		setSpecialEvent(event.target.value);
	};

	const handleClose = () => {
		setOpen(false);
		setSpecialEvent('none');
	};

	const handlePrefixClose = () => {
		setPrefixOpen(false);
	};

	useEffect(() => {
		let mounted = true;

		axios
			.get('http://localhost:8000/session/', {
				withCredentials: true,
			})
			.then((res) => {
				if (mounted) {
					setUser(res.data);
					axios
						.get(
							`http://localhost:8000/api/commands/${res.data.twitchId}`
						)
						.then((response) => {
							if (response.data.message) {
								setCommands([]);
								setPrefix(false);
							} else {
								setCommands(response.data.commands);
								setPrefix(response.data.prefix);
							}
						})
						.catch((error) => console.error(error));
				}
			});

		return () => (mounted = false);
	}, []);

	if (commands != null && prefix != null && user != null) {
		return (
			<>
				<Navbar onOpenChange={setSwipeOpen} />
				<div style={{ display: 'flex', flexGrow: 1 }}>
					{isMobile ? (
						<SwipeDrawer
							open={swipeOpen}
							onOpenChange={setSwipeOpen}
						/>
					) : (
						<PermDrawer />
					)}
					<div className="content">
						<AlertComponent
							severity={query.get('status')}
							message={query.get('message')}
						/>
						<CommandTable
							commands={commands ? commands : null}
							prefix={prefix ? prefix : '!'}
							token={user.access_token}
						/>
						<div
							style={{
								display: 'flex',
								flexGrow: 1,
								marginTop: '24px',
								justifyContent: 'space-between',
							}}
						>
							<div></div>
							<div>
								<Button
									variant="contained"
									color="primary"
									style={{
										marginRight: '24px',
										marginBottom: '24px',
									}}
									startIcon={<AddCircleIcon />}
									onClick={() => setOpen(true)}
								>
									Add new command
								</Button>
								<Button
									variant="contained"
									color="inherit"
									startIcon={<SettingsIcon />}
									onClick={() => setPrefixOpen(true)}
									style={{ marginBottom: '24px' }}
								>
									Set Prefix
								</Button>
							</div>
						</div>
					</div>
				</div>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="responsive-dialog-title"
				>
					<DialogTitle id="responsive-dialog-title">
						{'Create a new command'}
					</DialogTitle>
					<form
						onSubmit={handleSubmit((data) =>
							axios
								.post(
									`http://localhost:8000/api/commands/${user.access_token}`,
									data
								)
								.then((response) => {
									if (response.data.message) {
										window.location.href = `/dashboard/commands?status=success&message=${response.data.message}`;
									} else if (response.data.error) {
										window.location.href = `/dashboard/commands?status=error&message=${response.data.error}`;
									} else window.location.reload();
								})
								.catch((error) => console.error(error))
						)}
						noValidate
					>
						<DialogContent>
							<Controller
								name="commandName"
								control={control}
								render={({
									field: { onChange },
									fieldState: { error },
								}) => (
									<TextField
										autoFocus
										margin="normal"
										id="commandName"
										label="Name"
										type="text"
										required
										fullWidth
										onChange={onChange}
										defaultValue=""
										error={!!error || false}
										helperText={
											error
												? error.message
												: 'Create a name for you to recognize your command'
										}
										inputProps={{ maxLength: 16 }}
									/>
								)}
								rules={{ required: 'Name required' }}
							/>
							<Controller
								name="command"
								control={control}
								render={({
									field: { onChange },
									fieldState: { error },
								}) => (
									<TextField
										autoFocus
										margin="normal"
										id="command"
										label="Command"
										type="text"
										required
										fullWidth
										onChange={onChange}
										defaultValue=""
										error={!!error || false}
										helperText={
											error
												? error.message
												: 'Create the command without a prefix'
										}
										inputProps={{
											maxLength: 16,
											style: {
												textTransform: 'lowercase',
											},
										}}
									/>
								)}
								rules={{ required: 'Command required' }}
							/>
							{specialEvent == 'none' ? (
								<Controller
									name="commandResponse"
									control={control}
									render={({
										field: { onChange, value },
										fieldState: { error },
									}) => (
										<TextField
											autoFocus
											margin="normal"
											id="commandResponse"
											label="Response"
											multiline
											type="text"
											fullWidth
											onChange={onChange}
											value={value || ''}
											error={!!error || false}
											helperText={
												error
													? error.message
													: 'Bot response to the command'
											}
											inputProps={{ maxLength: 500 }}
										/>
									)}
								/>
							) : null}
							{specialEvent == 'none' ? (
								<Controller
									name="commandDescription"
									control={control}
									render={({
										field: { onChange, value },
										fieldState: { error },
									}) => (
										<TextField
											autoFocus
											margin="normal"
											id="commandDescription"
											label="Description"
											type="text"
											multiline
											rows={4}
											fullWidth
											onChange={onChange}
											value={value || ''}
											error={!!error}
											helperText={
												error ? error.message : null
											}
											inputProps={{ maxLength: 500 }}
										/>
									)}
								/>
							) : null}
							<ReactHookFormSelect
								id="specialCommand"
								name="specialCommand"
								label="Special Event"
								value={specialEvent}
								onChange={handleChange}
								control={control}
								fullWidth
								margin="normal"
							>
								{special.map((option) => (
									<option
										key={option.value}
										value={option.value}
									>
										{option.label}
									</option>
								))}
							</ReactHookFormSelect>
						</DialogContent>
						<DialogActions>
							<Button
								autoFocus
								color="primary"
								onClick={handleClose}
							>
								Cancel
							</Button>
							<Button color="primary" autoFocus type="submit">
								Submit
							</Button>
						</DialogActions>
					</form>
				</Dialog>
				{!prefix ? (
					<Dialog
						open={prefixOpen}
						onClose={handlePrefixClose}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogTitle id="alert-dialog-title">
							{'Error'}
						</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								You need to create your first command in order
								to edit your prefix. You can create commands by
								tapping <code>Add New Command</code> button.
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handlePrefixClose} color="primary">
								OK
							</Button>
						</DialogActions>
					</Dialog>
				) : (
					<Dialog
						open={prefixOpen}
						onClose={handlePrefixClose}
						aria-labelledby="responsive-dialog-title"
					>
						<DialogTitle id="responsive-dialog-title">
							{'Edit your prefix'}
						</DialogTitle>
						<form
							onSubmit={handleSubmit((data) =>
								axios
									.post(
										`http://localhost:8000/api/commands/prefix/${user.access_token}`,
										data
									)
									.then((response) => {
										if (response.data.message) {
											window.location.href = `/dashboard/commands?status=success&message=${response.data.message}`;
										} else if (response.data.error) {
											window.location.href = `/dashboard/commands?status=error&message=${response.data.error}`;
										} else window.location.reload();
									})
									.catch((error) => console.error(error))
							)}
							noValidate
						>
							<DialogContent>
								<Controller
									name="prefix"
									control={control}
									render={({
										field: { onChange },
										fieldState: { error },
									}) => (
										<TextField
											autoFocus
											margin="normal"
											id="prefix"
											label="Prefix"
											type="text"
											required
											fullWidth
											onChange={onChange}
											defaultValue={prefix}
											error={!!error || false}
											helperText={
												error ? error.message : null
											}
											inputProps={{ maxLength: 1 }}
										/>
									)}
									rules={{
										required: 'Please set your prefix',
									}}
								/>
							</DialogContent>
							<DialogActions>
								<Button
									autoFocus
									color="primary"
									onClick={handlePrefixClose}
								>
									Cancel
								</Button>
								<Button color="primary" autoFocus type="submit">
									Submit
								</Button>
							</DialogActions>
						</form>
					</Dialog>
				)}
			</>
		);
	} else return <Loading />;
};

export default Commands;
