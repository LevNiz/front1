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
  TechChat,
  SavedAddresses,
  AddNewAddress,
  UpdateAddress,
  BGBuyerDetail,
  SendApplication,
  BuyRequest,
  AddBuyRequest,
  TopUpWallet,
  GBChatMessages,
  AlaketDetail,
  AlaketNew,
  ItemSearchRequest,
  ItemSearchRequestNew,
  ItemSearchRequestDetail,
  ItemsDetail,
  BecomeBuyer,
  BuyRequestDetail,
  BuyRequestUpdate,
  ItemSearchRequestUpdate,
} from '../components';
import {
  Auth,
  Home,
  Profile,
  Tracking,
  Depots,
  Alaket,
  GbBuyer,
  GBBusiness,
  Applications,
  GBChat,
  GBFranchises,
  PrivacyPolicy,
  UserAgreement,
  RefundPolicy,
  MainPage,
  Items,
  Categories,
  Basket,
  Order,
  Favorites,
  Brands,
} from '../pages';

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
          <Route path=':id' element={<BGBuyerDetail />} />
          <Route path='become-buyer' element={<BecomeBuyer />} />
        </Route>
        <Route path='alaket'>
          <Route index element={<Alaket />} />
          <Route path=':id' element={<AlaketDetail />} />
          <Route path='new' element={<AlaketNew />} />
        </Route>
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/user-agreement' element={<UserAgreement />} />
        <Route path='refund-policy' element={<RefundPolicy />} />
        <Route path='gb-business' element={<GBBusiness />} />
        <Route path='gb-franchise' element={<GBFranchises />} />
        <Route path='gb-shop'>
          <Route index element={<MainPage />} />
          <Route path='categories' element={<Categories />} />
          <Route path='items'>
            <Route index element={<Items />} />
            <Route path=':id' element={<ItemsDetail />} />
          </Route>
          <Route path='basket' element={<Basket />} />
          <Route path='favorites' element={<Favorites />} />
          <Route path='order' element={<Order />} />
          <Route path='brands' element={<Brands />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path='profile' element={<Profile />}>
            <Route path='personal-data' element={<PersonalData />} />
            <Route path='my-wallet'>
              <Route index element={<MyWallet />} />
              <Route path='top-up' element={<TopUpWallet />} />
            </Route>
            <Route path='my-applications' element={<MyApplications />} />
            <Route path='tech-chat' element={<TechChat />} />
            <Route path='saved-addresses'>
              <Route index element={<SavedAddresses />} />
              <Route path='new' element={<AddNewAddress />} />
              <Route path='update/:id' element={<UpdateAddress />} />
            </Route>
            <Route path='notifications' element={<Notifications />}>
              <Route path=':id' element={<NotificationDetail />} />
            </Route>
            <Route path='my-parcels' element={<MyParcels />} />
            <Route path='buy-request'>
              <Route index element={<BuyRequest />} />
              <Route path='new' element={<AddBuyRequest />} />
              <Route path=':id' element={<BuyRequestDetail />} />
              <Route path='update/:id' element={<BuyRequestUpdate />} />
            </Route>
            <Route path='search-request'>
              <Route index element={<ItemSearchRequest />} />
              <Route path='new' element={<ItemSearchRequestNew />} />
              <Route path=':id' element={<ItemSearchRequestDetail />} />
              <Route path='update/:id' element={<ItemSearchRequestUpdate />} />
            </Route>
          </Route>
          <Route path='gb-chat' element={<GBChat />}>
            <Route path='t/:id' element={<GBChatMessages />} />
            <Route />
          </Route>
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
