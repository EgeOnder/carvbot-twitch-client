/* eslint-disable react/prop-types */
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { Controller } from 'react-hook-form';
import React from 'react';

const ReactHookFormSelect = ({
	name,
	label,
	control,
	defaultValue,
	children,
	...props
}) => {
	const labelId = `${name}-label`;
	return (
		<FormControl {...props}>
			<InputLabel id={labelId}>{label}</InputLabel>
			<Controller
				render={({ field }) => (
					<Select {...field} labelId={labelId} label={label} native>
						{children}
					</Select>
				)}
				name={name}
				control={control}
				defaultValue={defaultValue}
			/>
		</FormControl>
	);
};

export default ReactHookFormSelect;
