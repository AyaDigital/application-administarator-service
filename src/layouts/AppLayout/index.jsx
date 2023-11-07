import React, {useEffect} from 'react';
import { Box } from '@chakra-ui/react'
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '_store';
import Loader from '_components/Loader';
import Header from '../Header';
import SideBar from '../SideBar';
import './appLayout.scss';

/**
 * This is the main app layout component. We define elements like
 * header and sidebar, it will render any children passed as props inside
 * the layout content.
 */

const AppLayout = () => {
    const dispatch = useDispatch();
    const isAuthReady = useSelector((state) => state.auth.isAuthReady);

    useEffect(() => {
		if (!isAuthReady) {
			dispatch(authActions.keyckloakLogin())
		}
	}, [isAuthReady, dispatch]);

	return (
		<Box w='100%' h='100%'>
			<div className="app-layout">
			{
					!isAuthReady ? (
						<Loader width={'100%'} />
					) : (
						<>
							<Header />
							<div className="app-layout-content" id="app-layout">
								<SideBar />
								<div className="body-content">
									<Outlet />
								</div>
							</div>
						</>
					)
				}
			</div>
		</Box>
	);
}

export default AppLayout;
