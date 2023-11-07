import React from 'react';
import { useFetchOnboardingPagesQuery } from '../../_store';
import Loader from '../../_components/Loader';

import './onboarding.scss';
import {  } from "react-router-dom";

const Onboarding = () => {
	const { isLoading, isError, data: onboardingpages = []} = useFetchOnboardingPagesQuery();

	const onChange = (e) => {
		console.log('Checkbox checked:', (e.target.checked));
	}
	console.log('onboardingpages', onboardingpages);
	return (
		<div className='clinics-layout'>
		{
			isLoading ? (
				<Loader height='500px' width={'100%'} />
			) : (
				<>
					<div className='practitioners-table'>
						<div className='table-header'>
						</div>
						{onboardingpages.map(item => {
								return (
									<div className='table-row' key={item.id}>

									</div>
								);
						})}
					</div>
				</>
			)
		}

	</div>
	)
};

export { Onboarding };
