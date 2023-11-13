import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import { Divider } from '@chakra-ui/react'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Tabs, TabList, TabPanels, Tab, TabPanel,
	Input as TextField
  } from '@chakra-ui/react';

import { BaseData, SpecialityData, AddressData } from './components';
import './profilesEdition.scss';
import {  } from "react-router-dom";

const ProfilesEdition = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const profileId =  pathname.split('/').pop();

	return (
			<div className='settings-layout'>
				<Breadcrumb
					fontWeight='medium'
					fontSize='sm'
				>
					<BreadcrumbItem>
						<BreadcrumbLink
							color='gray.500'
							onClick={() => {navigate('/')}}
						>
							Home
						</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbItem>
						<BreadcrumbLink
							color='gray.500'
							onClick={() => {navigate('/profiles')}}
						>
							Profiles
						</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbItem>
						<BreadcrumbLink
							href='#'
							isCurrentPage
							color='gray.500'
						>
							Profile edition
						</BreadcrumbLink>
					</BreadcrumbItem>

				</Breadcrumb>
				<div className='settings-block'>
					<Divider />
						<>
							<Tabs isFitted variant='enclosed'>
								<TabList mb='1em'>
									<Tab>Edit Base Data</Tab>
									<Tab>Edit Speciality</Tab>
									<Tab>Edit Address</Tab>
								</TabList>
								<TabPanels>
									<TabPanel>
										<BaseData  id={profileId} />
									</TabPanel>
									<TabPanel>
										<SpecialityData id={profileId} />
									</TabPanel>
									<TabPanel>
										<AddressData id={profileId} />
									</TabPanel>
								</TabPanels>
							</Tabs>
						</>
				</div>
			</div>
	)
};

export { ProfilesEdition };
