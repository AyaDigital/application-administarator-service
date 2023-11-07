import React, { useState, useEffect } from 'react';
import {
	Button,
	Select,
	Input as TextField,
	FormControl,
	FormLabel,
	Grid,
	GridItem,
	Spinner
} from '@chakra-ui/react';

import {
	useCreateScheduleMutation,
	useFetchOnePractitionerQuery
} from '_store';

import '../practitioners.scss';

const hourPoints = [
	'09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
]

const durations = [
	'5', '10', '15', '20', '25', '30', '60', '90', '120', '180', '240'
]

const CreateScheduleForm = ({
	practitionerId = null,
	onClose,
	setError
}) => {
	const { isLoading: isPractitionerLoading, data: practitioner = {}} = useFetchOnePractitionerQuery(practitionerId);
	const [ createSchedule, {isLoading, isSuccess, error }] = useCreateScheduleMutation();

	const getTimezoneOffset = () => {
		let offsetInMinutes = new Date().getTimezoneOffset();

		let hours = Math.abs(Math.floor(offsetInMinutes/60));
		let minutes = Math.abs(Math.floor(offsetInMinutes%60));

		let offsetString = "";
		if (offsetInMinutes >= 0) {
			offsetString += "-";
		} else {
			offsetString += "+";
		}

		offsetString += hours.toString().padStart(2,"0")
			+ ":" + minutes.toString().padStart(2,"0");

		return offsetString;
	}

	const [date, setDate] = useState();
	const [dayStart, setDayStart] = useState();
	const [dayEnd, setDayEnd] = useState();
	const [slotDuration, setSlotDuration] = useState();
	const [comment, setComment] = useState();
	const [type, setType] = useState();
	const [isActive, setIsActive] = useState(false);

	const handleCreateSchedule = () => {
		let schedule = {
			date,
			dayStart,
			dayEnd,
			zoneOffset: getTimezoneOffset(),
			practitionerIds: [practitioner.id],
			slotDuration: Number(slotDuration),
			active: isActive,
			comment,
			slotType: type
		}
		createSchedule(schedule)
	}

	useEffect(() => {
		if (isSuccess) {
			onClose();
			setError()
		}
		if (error) {
			setError(error?.data?.errors[0]);
		}
	}, [isSuccess, error, onClose, setError])

	return (
		<div className='schedule-layout'>
			<>
			{
				isLoading || isPractitionerLoading ? (
					
						<Spinner
							thickness='4px'
							speed='0.65s'
							emptyColor='gray.200'
							color='blue.500'
							size='xl'
						/>
				) : (
						<Grid
							gridTemplateRows={'repeat(7, ifr)'}
						    gridTemplateColumns={'250px 250px'}
							w='300px'
							h='550px'
							rowGap='1'
							gap='2'
							color='blackAlpha.700'
							fontWeight='bold'
						>
							<GridItem h='50px' colSpan={2}>
								<FormControl variant="floating">
									<TextField
										required
										h='50px'
										placeholder=" "
										id="outlined-controlled"
										value={date}
										type='date'
										onChange={(event) => {
											setDate(event.target.value);
										}}
									/>
									<FormLabel>Date</FormLabel>
								</FormControl>
							</GridItem>
							<GridItem h='50px' colSpan={2} >
								<FormControl variant="floating">
									<Select
										placeholder='Select option'
										h='50px'
										value={dayStart}
										onChange={(event) => {
											setDayStart(event.target.value);
										}}
									>
										{
											hourPoints.map((item) => (
												<option value={item}>{item}</option>
											))
										}
									</Select>
									<FormLabel>Day start</FormLabel>
								</FormControl>
							</GridItem>
							<GridItem h='50px' colSpan={2}>
								<FormControl variant="floating">
									<Select
										placeholder='Select option'
										h='50px'
										value={dayEnd}
										onChange={(event) => {
											setDayEnd(event.target.value);
										}}
									>
										{
											hourPoints.map((item) => (
												<option value={item}>{item}</option>
											))
										}
									</Select>
									<FormLabel>Day end</FormLabel>
								</FormControl>
							</GridItem>
							<GridItem h='50px' colSpan={2}>
								<FormControl variant="floating">
									<Select
										placeholder='Select option'
										h='50px'
										value={slotDuration}
										onChange={(event) => {
											setSlotDuration(event.target.value);
										}}
									>
										{
											durations.map((item) => (
												<option value={Number(item)}>{item}</option>
											))
										}
									</Select>
									<FormLabel>Slot duration</FormLabel>
								</FormControl>
							</GridItem>

							<GridItem h='50px' colSpan={2}>
								<FormControl variant="floating">
									<TextField
										required
										placeholder=" "
										h='50px'
										id="outlined-controlled"
										value={comment}
										onChange={(event) => {
											setComment(event.target.value);
										}}
									/>
									<FormLabel>Comment</FormLabel>
								</FormControl>
							</GridItem>
							<GridItem h='50px' colSpan={1}>
								<FormControl variant="floating">
									<Select
										placeholder='Select option'
										h='50px'
										value={type}
										onChange={(event) => {
											setType(event.target.value);
										}}
									>
										{
											['ONLINE', 'OFFLINE'].map((item) => (
												<option value={item}>{item}</option>
											))
										}
									</Select>
									<FormLabel>Type</FormLabel>
								</FormControl>
							</GridItem>
							<GridItem h='50px' colSpan={1}>
								<FormControl variant="floating">
									<Select
										placeholder='Select option'
										h='50px'
										value={isActive}
										onChange={(event) => {
											setIsActive(event.target.value);
										}}
									>
										<option value='true'>true</option>
										<option value='false'>false</option>
									</Select>
									<FormLabel>Is Active</FormLabel>
								</FormControl>
							</GridItem>

							<GridItem h='50px' colSpan={1} textAlign={'center'}>
								<Button
									w='200px'
									h='50px'
									variant='outline'
									colorScheme='teal'
									size='xl'
									onClick={onClose}
								>
									Close
								</Button>
							</GridItem>
							<GridItem  colSpan={1} textAlign={'center'}>
								<Button
									colorScheme='teal'
									variant='outline'
									w='200px'
									h='50px'
									size='xl'
									onClick={() => handleCreateSchedule()}
								>
									Save
								</Button>
							</GridItem>
						</Grid>
				)
			}
			</>
		</div>
	)
};

export { CreateScheduleForm };
