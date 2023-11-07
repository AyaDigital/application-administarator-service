import { configureStore } from '@reduxjs/toolkit';
import { practitionersApi } from './api/practitioners.api';
import { clinicsApi } from './api/clinics.api';
import { insuranceApi } from './api/insurances.api';
import { onboardingApi } from './api/onboarding.api';
import { geographyApi } from './api/geography.api';
import { specialitiesApi } from './api/specialities.api';
import { citiesApi } from './api/cities.api';
import { countriesApi } from './api/countries.api';
import { statesApi } from './api/states.api';
import { schedulesApi } from './api/schedule.api';
import { profilesApi } from './api/profiles.api';
import { degreesApi } from './api/degrees.api';
import { languagesApi } from './api/languages.api';
import { emergencyApi } from './api/emergency.api';
import { appealsApi } from './api/appeals.api';

import { authReducer } from './slice/auth.slice';
import { profileReducer } from './slice/profile.slice';

export * from './slice/auth.slice';
export * from './slice/profile.slice';
export * from './api/practitioners.api';
export * from './api/clinics.api';
export * from './api/insurances.api';
export * from './api/onboarding.api';
export * from './api/geography.api';
export * from './api/specialities.api';
export * from './api/cities.api';
export * from './api/schedule.api';
export * from './api/profiles.api';
export * from './api/degrees.api';
export * from './api/languages.api';
export * from './api/emergency.api';
export * from './api/appeals.api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  	[practitionersApi.reducerPath]: practitionersApi.reducer,
  	[clinicsApi.reducerPath]: clinicsApi.reducer,
  	[insuranceApi.reducerPath]: insuranceApi.reducer,
    [onboardingApi.reducerPath]: onboardingApi.reducer,
    [geographyApi.reducerPath]: geographyApi.reducer,
    [specialitiesApi.reducerPath]: specialitiesApi.reducer,
    [citiesApi.reducerPath]: citiesApi.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    [statesApi.reducerPath]: statesApi.reducer,
    [schedulesApi.reducerPath]: schedulesApi.reducer,
    [profilesApi.reducerPath]: profilesApi.reducer,
    [degreesApi.reducerPath]: degreesApi.reducer,
    [languagesApi.reducerPath]: languagesApi.reducer,
    [emergencyApi.reducerPath]: emergencyApi.reducer,
    [appealsApi.reducerPath]: appealsApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(clinicsApi.middleware)
      .concat(insuranceApi.middleware)
      .concat(onboardingApi.middleware)
      .concat(geographyApi.middleware)
      .concat(specialitiesApi.middleware)
      .concat(citiesApi.middleware)
      .concat(countriesApi.middleware)
      .concat(statesApi.middleware)
      .concat(schedulesApi.middleware)
      .concat(profilesApi.middleware)
      .concat(degreesApi.middleware)
      .concat(languagesApi.middleware)
      .concat(emergencyApi.middleware)
      .concat(appealsApi.middleware)
      .concat(practitionersApi.middleware),
});
