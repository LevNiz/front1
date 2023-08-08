import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import {
  AuthConfirm,
  AuthPassword,
  AuthPersonalData,
  Layout,
  Login,
  Notifications,
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
        <Route path='tracking' element={<Tracking />} />
        <Route path='warehouses'>
          <Route index element={<Warehouses />} />
          <Route path=':id' element={<WareHouseDetail />} />
        </Route>
        <Route path='profile'>
          <Route index element={<Profile />} />
          <Route path='notifications' element={<Notifications />} />
        </Route>
      </Route>
    </Route>
  )
);
