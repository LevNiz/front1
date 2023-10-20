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
  DepotDetail,
  PrivateRoute,
  MyWallet,
  CalcDelivery,
  MyApplications,
  GBChat,
  TechChat,
  SavedAddresses,
} from '../components';
import {
  Auth,
  Home,
  Profile,
  Tracking,
  Depots,
  Alaket,
  GbBuyer,
  GbBusiness,
  Applications,
} from '../pages';
import SendApplication from '../components/Applications/SendApplication/SendApplication';

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
        <Route path='tracking'>
          <Route index element={<Tracking />} />
          <Route path=':id' element={<DetailInfo />} />
        </Route>
        <Route path='depots'>
          <Route index element={<Depots />} />
          <Route path=':id' element={<DepotDetail />} />
        </Route>
        <Route path='gb-buyer'>
          <Route index element={<GbBuyer />} />
        </Route>
        <Route path='gb-business'>
          <Route index element={<GbBusiness />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path='profile' element={<Profile />}>
            <Route path='personal-data' element={<PersonalData />} />
            <Route path='my-wallet' element={<MyWallet />} />
            <Route path='my-applications' element={<MyApplications />} />
            <Route path='gb-chat' element={<GBChat />} />
            <Route path='tech-chat' element={<TechChat />} />
            <Route path='saved-addresses' element={<SavedAddresses />} />
            <Route path='notifications' element={<Notifications />}>
              <Route path=':id' element={<NotificationDetail />} />
            </Route>
            <Route path='my-parcels' element={<MyParcels />} />
          </Route>
          <Route path='alaket' element={<Alaket />} />
          <Route path='applications'>
            <Route index element={<Applications />} />
            <Route path='send-application' element={<SendApplication />} />
            <Route path='calculate' element={<CalcDelivery />} />
          </Route>
        </Route>
        <Route path='*' element={<Home />} />
      </Route>
    </Route>
  )
);
