import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import {
  SignUp,
  DetailInfo,
  Layout,
  SignIn,
  MyParcels,
  NotificationDetail,
  Notifications,
  PersonalData,
  ResetPass,
  ResetPassConfirm,
  ResetPassNew,
  ResetPassSuccess,
  WareHouseDetail,
} from '../components';
import { Auth, Home, Profile, Tracking, Warehouses } from '../pages';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='auth' element={<Auth />}>
        <Route path='sign-up' element={<SignUp />} />
        <Route path='sign-in' element={<SignIn />} />
        <Route path='reset-password'>
          <Route index element={<ResetPass />} />
          <Route path='step-1' element={<ResetPassConfirm />} />
          <Route path='step-2' element={<ResetPassNew />} />
          <Route path='success' element={<ResetPassSuccess />} />
        </Route>
      </Route>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='tracking' element={<Tracking />}>
          <Route path=':id' element={<DetailInfo />} />
        </Route>
        <Route path='warehouses'>
          <Route index element={<Warehouses />} />
          <Route path=':id' element={<WareHouseDetail />} />
        </Route>
        <Route path='profile' element={<Profile />}>
          <Route path='personal-data' element={<PersonalData />} />
          <Route path='notifications' element={<Notifications />}>
            <Route path=':id' element={<NotificationDetail />} />
          </Route>
          <Route path='my-parcels' element={<MyParcels />} />
        </Route>
      </Route>
    </Route>
  )
);
