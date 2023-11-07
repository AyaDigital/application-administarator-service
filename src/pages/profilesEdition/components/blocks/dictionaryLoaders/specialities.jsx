import React, { useState, useEffect } from 'react';
import { uniq } from 'lodash';
import {
	Spinner,
} from '@chakra-ui/react';

import {
	useFetchSpecialitiesQuery,
} from '_store';
import InfiniteLoaderBlock from '_components/inputs/InFiniteLoader';
import '../../../profilesEdition.scss';

const SpecialitiesLoader = ({
    handleAddSpeciality,
    handleListOpen
}) => {
	const [search, setSearch] = useState('');
	const [currentScrollToken, setCurrentScrollToken] = useState(null);
	const [currentSpecialities, setCurrentSpecialities] = useState([]);
	const [page, setPage] = useState(0);

	const { isLoading: isSpecialitiesLoading, isSuccess, data: specialities = {}}
		= useFetchSpecialitiesQuery({
			scrollId: currentScrollToken,
			page,
			search
		});
	const { data = [], scrollToken, isLastPage } = specialities;

	useEffect(() => {
		const specialitiesData = currentScrollToken === null ? data : uniq([...data, ...currentSpecialities]);
		setCurrentSpecialities(specialitiesData)
	}, [isSuccess, isLastPage, scrollToken, data, currentScrollToken, currentSpecialities]);

	const _loadNextPage = () => {
		return new Promise(resolve =>
			setTimeout(() => {
				setPage(page + 1)
				setCurrentScrollToken(scrollToken);
			  	resolve();
			}, 0)
		  );
	};

	  useEffect(() => {
		if (search) {
			setPage(0)
			setCurrentScrollToken(null);
			setCurrentSpecialities([])
		}
	  }, [search])

	return (
		<div className='speciality-layout'>
			<>
			{
				isSpecialitiesLoading  ? (
					
						<Spinner
							thickness='4px'
							speed='0.65s'
							emptyColor='gray.200'
							color='blue.500'
							size='xl'
						/>
				) : (
                    <InfiniteLoaderBlock
                        hasNextPage={!isLastPage}
                        isNextPageLoading={false}
                        items={currentSpecialities}
                        // listOpen={search}
                        loadNextPage={_loadNextPage}
                        wrapperClassName='listbox'
                        groupedOptions={currentSpecialities || []}
                        handleSelect={handleAddSpeciality}
                        search={search}
                        onFocus={handleListOpen}
                        onChange={(event) => {
                            setSearch(event.target.value);
                        }}
                    />
				)
			}
			</>
		</div>
	)
};

export { SpecialitiesLoader };
