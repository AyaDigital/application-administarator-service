import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import upperfirst from 'lodash.upperfirst';
import clone from 'lodash/clone';
import { Button } from '@chakra-ui/react';
import { useFetchClinicsQuery } from '../../_store';
import Loader from '../../_components/Loader';
import SuccessIcon from '../../images/Icons/successIcon';
import FailedIcon from '../../images/Icons/failedIcon';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
  } from '@chakra-ui/react';
import { Checkbox } from '@chakra-ui/react';
import { CreateClinicForm } from './components/createCountry';
import './countries.scss';
import {  } from "react-router-dom";

const Countries = () => {
	const navigate = useNavigate();
	const { isLoading, isError, data = {}} = useFetchClinicsQuery();
	const { content: clinics = []} = data;
	const [open, setOpen] = useState(false);

	const [selectedClinics, setSelectedClinics] = useState([]);

	const handleOpen = () => {
		setOpen(true);

	}
	const handleClose = () => setOpen(false);

	const onChange = ({ target: {value, checked} }) => {
		const selected = clone(selectedClinics);

		if (checked) {
			selected.push(value);
			setSelectedClinics(selected);
		} else {
			const dropped = selected.filter(item => item!==value)
			setSelectedClinics(dropped);
		}
	}
	console.log('selectedClinics[0]', selectedClinics)
	return (
			<div className='clinics-layout'>
				<div className='controls-block'>
					<div>
						<Button
							sx={{
								backgroundColor: 'rgba(44, 121, 206, 0.7)',
								color: 'white'
							}}
							size='lg'
							onClick={() => {
								setSelectedClinics([]);
								handleOpen();
							}}
						>
							Create
						</Button>
					</div>
					<div>
						<Button
							sx={{
								backgroundColor: 'rgba(44, 121, 206, 0.7)',
								color: 'white'
							}}
							size='lg'
							onClick={handleOpen}
							isDisabled={selectedClinics.length !== 1}
						>
							Edit
						</Button>
					</div>
					<div>
						<Button
							size='lg'
							onClick={() => {navigate('/clinics/' + selectedClinics[0])}}
							isDisabled={selectedClinics.length !== 1}
							sx={{
								backgroundColor: 'rgba(44, 121, 206, 0.7)',
								color: 'white'
							}}
						>
							Open
						</Button>
					</div>
				</div>
				{
					isLoading ? (
						<Loader height='500px' width={'100%'} />
					) : (
						<>
							<div className='clinics-table'>
								<div className='table-header'>
									<div className='rc-checkbox'></div>
									<div className='id'>ID</div>
									<div className='name'>Name</div>
									<div className='description'>Description</div>
									<div className='is-active'>Active</div>
								</div>
								{clinics.map(item => {
										return (
											<div className='table-row' key={item.id}>
												<Checkbox
													value={item.id}
													onChange={onChange}
													disabled={open}
												/>
												<div className='id'>{item.id}</div>
												<div className='name'>{upperfirst(item.nameOrg)}</div>
												<div className='description'>{item.description}</div>
												<div className='is-active'>
												{
														item.active ? (
															<SuccessIcon />
														) : (
															<FailedIcon />
														)
													}
												</div>
											</div>
										);
								})}
							</div>
						</>
					)
				}
				<Modal
					isOpen={open}
					//isCentered
					size='xl'
					onClose={() => handleClose()}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>
							{
								selectedClinics.length === 1 ? 'Edit clinic' : 'New clinic'
							}
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<div>
								<CreateClinicForm
									clinicId={selectedClinics[0]}
									onClose={() => handleClose()}
								/>
							</div>
						</ModalBody>
					</ModalContent>
				</Modal>
			</div>
	)
};

export { Countries };
