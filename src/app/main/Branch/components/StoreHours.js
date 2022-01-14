import React, { useState, useEffect } from 'react';
import { Button, Icon, Tab, Tabs, TextField, MenuItem, InputAdornment, Typography } from '@material-ui/core';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import _ from '@lodash';
import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';
import FuseLoading from '@fuse/core/FuseLoading';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import store from 'app/store';

const hours = [...Array(24).keys()]
const mins = ['00', '15', '30', '45'];
const days = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
const defaultHours = [
	{ day: '星期天', start_hour: '9', start_min: '00', end_hour: '21', end_min: '00' },
	{ day: '星期一', start_hour: '', start_min: '', end_hour: '', end_min: '' },
	{ day: '星期二', start_hour: '', start_min: '', end_hour: '', end_min: '' },
	{ day: '星期三', start_hour: '', start_min: '', end_hour: '', end_min: '' },
	{ day: '星期四', start_hour: '', start_min: '', end_hour: '', end_min: '' },
	{ day: '星期五', start_hour: '', start_min: '', end_hour: '', end_min: '' },
	{ day: '星期六', start_hour: '', start_min: '', end_hour: '', end_min: '' }
];

const useStyles = makeStyles(theme => ({
	container: {
		width: '100%',
		flexDirection: 'row'
	},
	textContainer: {
		display: 'inline-block'
		// justifyContent: 'center',
		// alignItems: 'center',
	},
	timeInput: {
		width: 100,
		margin: 8
	}
}));

function StoreHours(props) {
	const { storeNumber } = useParams();
	const classes = useStyles(props);
	const { form, setForm, setAlert } = props;
	const [storeHours, setStoreHours] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		initStoreTime();
	}, [form]);

	const initStoreTime = () => {
		if (form.storeOpenTime.length !== 0) {
			setStoreHours(renderTime(form.storeOpenTime));
			return;
		} else {
			setStoreHours(defaultHours);
			return;
		}
	};

	const renderTime = timeArray => {
		const display_time = timeArray.map((time, index) => {
			const day = days[index];
			const start_hour = Math.floor(Number(time[0]) % 24);
			const start_min = (Number(time[0]) - start_hour) * 60;
			const end_hour = Math.floor(Number(time[1]) % 24);
			const end_min = (Number(time[1]) - end_hour) * 60;
			return {
				day,
				start_hour: start_hour.toString(),
				start_min: start_min == 0 ? '00' : start_min.toString(),
				end_hour: end_hour.toString(),
				end_min: end_min == 0 ? '00' : end_min.toString()
			};
		});
		return display_time;
	};

	const handleTimeChange = (event, query, idx) => {
		const temp = [...storeHours];
		temp[idx][query] = event.target.value;
		setStoreHours(temp);
	};

	const saveBusinessTime = event => {
		const timeArray = storeHours.map(each => [
			Number(each.start_hour) + Number(each.start_min),
			Number(each.end_hour) + Number(each.end_min)
		]);
		setForm({...form, storeOpenTime:timeArray})
		setAlert({ show: true, message: '保存营业时间成功！' });
		setTimeout(() => {
			setAlert({ show: false, message: '' });
		}, 2000);
	};

	const TimeInput = idx => {
		return (
			<div className={classes.container}>
				<Typography className="text-8 pl-30 sm:text-20 truncate">{days[idx]}</Typography>
				<TextField
					className={classes.timeInput}
					placeholder="xx:xx 例如: 10:30"
					label="Hour"
					id={`${idx}_start_hour`}
					name={`${idx}_start_hour`}
					value={storeHours[idx].start_hour}
					onChange={event => handleTimeChange(event, 'start_hour', idx)}
					variant="outlined"
					select
				>
					{hours.map(el => (
						<MenuItem key={`${idx}start_hour${el}`} value={el.toString()}>
							{el}
						</MenuItem>
					))}
				</TextField>
				<TextField
					className={classes.timeInput}
					placeholder="xx:xx"
					label="Minute"
					id={`${idx}_start_min`}
					name={`${idx}_start_min`}
					value={storeHours[idx].start_min}
					onChange={event => handleTimeChange(event, 'start_min', idx)}
					variant="outlined"
					select
				>
					{mins.map(el => (
						<MenuItem key={`${idx}start_min${el}`} value={el}>
							{el}
						</MenuItem>
					))}
				</TextField>

				<div className={clsx(classes.textContainer, 'mt-20')}>
					<Typography className="text-16 sm:text-20 truncate">to</Typography>
				</div>

				<TextField
					className={classes.timeInput}
					placeholder="xx:xx"
					label="Hour"
					id={`${idx}_end_hour`}
					name={`${idx}_end_hour`}
					value={storeHours[idx].end_hour}
					onChange={event => handleTimeChange(event, 'end_hour', idx)}
					variant="outlined"
					select
				>
					{hours.map(el => (
						<MenuItem key={`${idx}end_hour${el}`} value={el.toString()}>
							{el}
						</MenuItem>
					))}
				</TextField>
				<TextField
					className={classes.timeInput}
					placeholder="xx:xx"
					label="Minute"
					id={`${idx}_end_min`}
					name={`${idx}_end_min`}
					value={storeHours[idx].end_min}
					onChange={event => handleTimeChange(event, 'end_min', idx)}
					variant="outlined"
					select
				>
					{mins.map(el => (
						<MenuItem key={`${idx}end_min${el}`} value={el}>
							{el}
						</MenuItem>
					))}
				</TextField>
			</div>
		);
	};

	if (!storeHours || loading) {
		return <FuseLoading />;
	} else {
		return (
			<div>
				{TimeInput(0)}
				{TimeInput(1)}
				{TimeInput(2)}
				{TimeInput(3)}
				{TimeInput(4)}
				{TimeInput(5)}
				{TimeInput(6)}
				<Button
					className="whitespace-no-wrap normal-case"
					variant="contained"
					color="secondary"
					onClick={saveBusinessTime}
				>
					<span className="hidden sm:flex">保存营业时间</span>
				</Button>
			</div>
		);
	}
}

export default StoreHours;
