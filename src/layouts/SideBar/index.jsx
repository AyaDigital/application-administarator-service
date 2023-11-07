import React, { useState, useEffect } from 'react';
import { Button,  Collapse} from '@chakra-ui/react';
import { useNavigate, useLocation } from "react-router-dom";
import DoctorsIcon from '../../images/Icons/doctorsIcon';
import Settingsicon from '../../images/Icons/clinicsManagment';
import MenuListIcon from 'images/Icons/menuListIcon';
import GeographyIcon from 'images/Icons/geographyIcon';
import AppointmentsManagementIcon from 'images/Icons/appointmentsManagementIcon';
import ClinicsIcon from 'images/Icons/clinicsIcon';
import DictionariesIcon from 'images/Icons/dictionaryIcon';
import SpecialityIcon from 'images/Icons/specialityIcon';
import { useSelector } from 'react-redux'

import './sideBar.scss';

const menu = {
	'border': 'none',
	'height': '20px',
	'backgroundColor': 'rgba(245, 250, 255, 1)',
	'&:hover': {
		'backgroundColor': 'rgba(245, 250, 255, 1)',
	},
};

const SideBar = () => {
	const [isSideBarOpen, setIsSideBarOpen] = useState(true);
	const [isDictionariesOpen, setIsDictionariesOpen] = useState(false);
	const roles = useSelector((state) => state.profile?.roles?.list);

	const isAdmin = roles?.some((item) => item.code === 'ROLE_ADMIN');

	const navigate = useNavigate();
	const { pathname } = useLocation();

	useEffect(() => {
		const dictionarisPath = pathname.includes('dictionaries');
		if (dictionarisPath) {
			setIsDictionariesOpen(true)
		}
	}, [pathname]);

	const redirectToLogs = () => {
		window.open('https://viewier-logs.aya-doc.com/', '_blank');
	}

	useEffect(() => {
		const sidebar = document.getElementById('sidebar');
		const appLayout = document.getElementById('app-layout');
		if (isSideBarOpen) {
			sidebar?.classList.add('expanded');
			sidebar?.classList.remove('collapsed');
			appLayout?.classList.add('sidebar-expanded');
			appLayout?.classList.remove('sidebar-collapsed');
		} else {
			sidebar?.classList.remove('expanded');
			sidebar?.classList.add('collapsed');
			appLayout?.classList.add('sidebar-collapsed');
			appLayout?.classList.remove('sidebar-expanded');
		}
	}, [isSideBarOpen]);

	return (
			<div className="sidebar expanded" id="sidebar">
				<div className="sidebar-header">
					<div></div>
					<div className={`sidebar-control ${isSideBarOpen ? 'open' : ''}`}>
						<Button
							sx={menu}
							//variant="outlined"
							disableripple='true'
							onClick={() => setIsSideBarOpen(!isSideBarOpen)}
						>
							<MenuListIcon />
						</Button>
					</div>
				</div>
				<div className="sidebar-body">
					<ul>
						<li>
							<Button
								sx={menu}
								disableripple='true'
								isDisabled={pathname.includes('insurance')}
								onClick={() => navigate('/insurance')}
							>
								<div className="button-label">
									<AppointmentsManagementIcon />
									<div className="menu-item-title">Insurances</div>
								</div>
							</Button>
						</li>
						<li>
							<Button
								sx={menu}
								disableripple='true'
								isDisabled={pathname.includes('clinics')}
								onClick={() => navigate('/clinics')}
							>
								<div className="button-label">
									<ClinicsIcon />
									<div className="menu-item-title">Clinics</div>
								</div>
							</Button>
						</li>
						<li>
							<Button
								sx={menu}
								disableripple='true'
								// isDisabled={}
								onClick={() => setIsDictionariesOpen(!isDictionariesOpen)}
							>
								<div className="button-label">
									<DictionariesIcon />
									<div className="menu-item-title">Dictionaries</div>
								</div>
							</Button>
							<Collapse in={isDictionariesOpen}>
								<div className='menu-list'>
									<ul>
										<li>
											<Button
												sx={menu}
												disableripple='true'
												isDisabled={pathname.includes('specialities')}
												onClick={() => navigate('/dictionaries/specialities')}
											>
												<div className="button-label">
													<SpecialityIcon />
													<div className="menu-item-title">Specialities</div>
												</div>
											</Button>
										</li>
										<li>
											<Button
												sx={menu}
												disableripple='true'
												isDisabled={pathname.includes('cities')}
												onClick={() => navigate('/dictionaries/cities')}
											>
												<div className="button-label">
													<GeographyIcon />
													<div className="menu-item-title">Cities</div>
												</div>
											</Button>
										</li>
										<li>
											<Button
												sx={menu}
												disableripple='true'
												isDisabled={pathname.includes('medical-degrees')}
												onClick={() => navigate('/dictionaries/medical-degrees')}
											>
												<div className="button-label">
													<GeographyIcon />
													<div className="menu-item-title">Medical degrees</div>
												</div>
											</Button>
										</li>
										<li>
											<Button
												sx={menu}
												disableripple='true'
												isDisabled={pathname.includes('emergencies')}
												onClick={() => navigate('/dictionaries/emergencies')}
											>
												<div className="button-label">
													<GeographyIcon />
													<div className="menu-item-title">Emergencies</div>
												</div>
											</Button>
										</li>
										<li>
											<Button
												sx={menu}
												disableripple='true'
												isDisabled={pathname.includes('appeals')}
												onClick={() => navigate('/dictionaries/appeals')}
											>
												<div className="button-label">
													<GeographyIcon />
													<div className="menu-item-title">Appeals</div>
												</div>
											</Button>
										</li>
										<li>
											<Button
												sx={menu}
												disableripple='true'
												isDisabled={pathname.includes('languages')}
												onClick={() => navigate('/dictionaries/languages')}
											>
												<div className="button-label">
													<GeographyIcon />
													<div className="menu-item-title">Languages</div>
												</div>
											</Button>
										</li>
									</ul>
								</div>
							</Collapse>
						</li>
						{
							isAdmin ? (
								<li>
									<Button
										sx={menu}
										disableripple='true'
										isDisabled={pathname.includes('profiles')}
										onClick={() => navigate('/profiles')}
									>
										<div className="button-label">
											<DoctorsIcon />
											<div className="menu-item-title">Profiles</div>
										</div>
									</Button>
								</li>
							) : null
						}
						{
							isAdmin ? (
								<li>
									<Button
										sx={menu}
										disableripple='true'
										onClick={() => redirectToLogs()}
									>
										<div className="button-label">
											<DictionariesIcon />
											<div className="menu-item-title">All logs</div>
										</div>
									</Button>
								</li>
							) : null
						}
					</ul>
				</div>
			</div>
	)
};

export default SideBar;