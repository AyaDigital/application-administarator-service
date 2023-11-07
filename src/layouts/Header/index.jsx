import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import upperfirst from 'lodash.upperfirst';
import Logo from '../../images/logo';
import { Button } from '@chakra-ui/react';
// Temprorary avatar stubb
import DropDownIcon from '../../images/Icons/dropdawnIcon';
import LogoutIcon from '../../images/Icons/logoutIcon';
import ProfileIcon from '../../images/Icons/profileIcon';
import { profileActions, authActions } from '_store';

import { useSelector, useDispatch } from 'react-redux'
import './header.scss';
import {  } from "react-router-dom";

const Header = () => {
    const dispatch = useDispatch();
	const profile = useSelector((state) => state.profile.profile);
	const token = useSelector((state) => state.auth.token);
	const { firstName, lastName, avatarUrl } = profile;

	const [isMenuBarOpen, setIsMenuOpen] = useState(false)

	const navigate = useNavigate();

	useEffect(() => {
		if (token) {
			dispatch(profileActions.getProfile())
			dispatch(profileActions.getProfileRoles())
		}
	}, [token, dispatch])

	useEffect(() => {
		const menubar = document.getElementById('dropdown');
		if (isMenuBarOpen) {
			menubar?.classList.add("open");
		} else {
			menubar?.classList.remove("open");
		}
	}, [isMenuBarOpen]);

	const signOut = () => {
		dispatch(authActions.logout());
	}

	const userName = `${upperfirst(firstName)} ${upperfirst(lastName)}`;

	return (
			<div className='header-layout'>
				<div className='header'>
					<div className='logo'><Logo /></div>
					<div className='headerCenter'></div>
					<div className='headerRight'>
						<div className='searchBlock'></div>
						<div className='notificationsBlock'></div>
						<div className='userBlock'>
							<a
								href='#'
								className={`userLink ${isMenuBarOpen ? 'open' : ''}`}
								onClick={() => setIsMenuOpen(!isMenuBarOpen)}
							>
								<div className='profile-avatar'>
									<img width='35px' height='35px' src={avatarUrl} alt='' />
								</div>
								<div className='userInfo'>
									<div className='userName'>
										{userName}
									</div>
									<div className='userRole'>
										{true ? 'Administrator' : 'Doctor'}
									</div>

								</div>
								<i className="fa custom-caret">
									<DropDownIcon />
								</i>
							</a>
							<div className="dropdown-menu" id="dropdown">
								<ul className="list-unstyled mb-2">
									<li className="divider"></li>
									<li>
										<a
											role="menuitem"
											onClick={() => {
												window.open('https://account-beta.aya-doc.com/account')
											}}
										>
											<i className="bx bx-user-circle">
												<ProfileIcon />
											</i>
											My Profile
										</a>
									</li>
									<li>
										<a
											role="menuitem"
											onClick={signOut}
										>
											<i className="bx bx-power-off">
												<LogoutIcon width='17' height='17' />
											</i>
											Logout
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>

				</div>
			</div>
	)
};

export default Header;