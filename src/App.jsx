import { Routes, Route, Navigate } from 'react-router-dom';

import AppLayout from 'layouts/AppLayout';
import { Home } from 'pages/home';
import { Practitioners } from 'pages/practitioners';
import { Emergencies } from 'pages/emergencies';
import { MedicalDegrees } from 'pages/medical-degrees';
import { Specialities } from 'pages/specialities';
import { Cities } from 'pages/cities';
// import { Countries } from 'pages/countries';
import { Insurances } from 'pages/insuranse';
import { Clinics } from 'pages/clinics';
import { Settings } from 'pages/settings';
// import { States } from 'pages/states';
import { Onboarding } from 'pages/onboarding';
import { ClinicPage } from 'pages/clinicPage';
import { ProfilesManagement } from 'pages/profilesCreation';
import { ProfilesEdition } from 'pages/profilesEdition';
import { Appeals } from 'pages/appeals';
import { Languages } from 'pages/languages';
import { Appointments } from 'pages/appointments';

function App() {

	return (
		<>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route index element={Home} />
					<Route path="profiles" element={<Practitioners />} />
					<Route path="profile/create" element={<ProfilesManagement />} />
					<Route path="profile/edit/:id" element={<ProfilesEdition />} />
					<Route path="dictionaries/specialities" element={<Specialities />} />
					<Route path="dictionaries/cities" element={<Cities />} />
					<Route path="dictionaries/emergencies" element={<Emergencies />} />
					<Route path="dictionaries/appeals" element={<Appeals />} />
					<Route path="dictionaries/languages" element={<Languages />} />
					<Route path="dictionaries/medical-degrees" element={<MedicalDegrees />} />
					<Route path="insurance" element={<Insurances />} />
					<Route path="appointments" element={<Appointments />} />
					<Route path="clinics" element={<Clinics />} />
					<Route path="settings" element={<Settings />} />
					<Route path="clinics/:id" element={<ClinicPage />} />
					<Route path="onboarding" element={<Onboarding />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
