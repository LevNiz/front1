import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import {
  AuthConfirm,
  AuthPassword,
  AuthPersonalData,
  DetailInfo,
  Layout,
  Login,
  MyParcels,
  NotificationDetail,
  Notifications,
  PersonalData,
  WareHouseDetail,
} from '../components';
import { Auth, Home, Profile, Tracking, Warehouses } from '../pages';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='register'>
        <Route index element={<Auth />} />
        <Route path='step-1' element={<AuthPersonalData />} />
        <Route path='step-2' element={<AuthPassword />} />
        <Route path='confirm' element={<AuthConfirm />} />
      </Route>
      <Route path='login' element={<Login />} />
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='tracking' element={<Tracking />} >
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
