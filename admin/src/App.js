import { fetchUtils, Admin, Resource, ShowGuesser } from "react-admin";
import { SuperFoodList, FoodList, FoodEdit, FoodCreate } from "./components/foods/Foods";
import {SuperOrderList, OrderList,SuperOrderEdit ,OrderEdit, OrderCreate} from "./components/orders/Orders";
import {AdminList, AdminEdit, AdminCreate} from "./components/admins/Admins";
import {UserList, UserEdit, UserCreate} from "./components/users/Users";
import PaymentsIcon from '@mui/icons-material/Payments';
import LoginPage from "./components/login/LoginPage";
import { SuperDeliveryList,DeliveryList,DeliveryEdit,DeliveryCreate } from "./components/deliveries/Deliveries";
import Provider from "./dataProvider.ts";
import FoodIcon from "@mui/icons-material/FoodBank";
import OrderIcon from "@mui/icons-material/DeliveryDining";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';
import { Dashboard } from "./components/dashboard/Dashboard";
import { authProvider } from './authProvider';
import './App.scss';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
  }
  const  token  = localStorage.getItem('auth');
  options.headers.set('authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const superAdmin = localStorage.getItem('super');

const dataProvider = Provider('http://localhost:3050', httpClient);

const App = () => (

   <Admin 
   authProvider={authProvider} 
   dataProvider={dataProvider}
   loginPage={LoginPage} 
   dashboard={Dashboard}
   >
    {
    superAdmin==="true"?
    <>
    <Resource 
    name="foods" 
    list={SuperFoodList} 
    edit={FoodEdit}  
    create={FoodCreate} 
    icon={FoodIcon} 
    />

    <Resource 
    name="orders" 
    list={SuperOrderList} 
    edit={SuperOrderEdit}  
    create={OrderCreate} 
    icon={OrderIcon} 
    />

    <Resource 
    name="deliveries" 
    list={SuperDeliveryList} 
    edit={DeliveryEdit}  
    create={DeliveryCreate}
    options={{ label: 'Delivery Fees' }} 
    recordRepresentation="location"
    icon={PaymentsIcon} 
    />

    <Resource 
    name="users" 
    list={UserList} 
    edit={UserEdit}  
    create={UserCreate}
    icon={GroupIcon} 
    />

    <Resource 
    name="admins" 
    list={AdminList} 
    edit={AdminEdit}  
    create={AdminCreate}
    icon={AdminPanelSettingsIcon} 
    />

    </>:
    <>
    
    <Resource 
    name="foods" 
    list={FoodList}
    show={ShowGuesser} 
    icon={FoodIcon} 
    />

    <Resource 
    name="orders" 
    list={OrderList} 
    edit={OrderEdit}  
    create={OrderCreate} 
    icon={OrderIcon} 
    />

    <Resource 
    name="deliveries" 
    list={DeliveryList} 
    show={ShowGuesser}
    options={{ label: 'Delivery Fees' }} 
    recordRepresentation="location"
    icon={PaymentsIcon} 
    />

    </>
    }

   </Admin>
  );

export default App;