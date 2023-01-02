import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import { FoodList, FoodEdit, FoodCreate } from "./components/foods/Foods";
import {OrderList, OrderEdit, OrderCreate} from "./components/orders/Orders";
import PaymentsIcon from '@mui/icons-material/Payments';
import { DeliveryList,DeliveryEdit,DeliveryCreate } from "./components/deliveries/Deliveries";
import restProvider from "ra-data-simple-rest";
import Provider from "ra-data-json-server"
import FoodIcon from "@mui/icons-material/FoodBank";
import OrderIcon from "@mui/icons-material/DeliveryDining";
import { Dashboard } from "./components/dashboard/Dashboard";
import { authProvider } from './authProvider';
import './App.scss';

const dataProvider = Provider('http://localhost:3050');

const App = () => (
   <Admin 
  //  authProvider={authProvider} 
   dataProvider={dataProvider} 
  //  dashboard={Dashboard}
   >
    <Resource 
    name="foods" 
    list={FoodList} 
    edit={FoodEdit}  
    create={FoodCreate} 
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
    edit={DeliveryEdit}  
    create={DeliveryCreate}
    options={{ label: 'Delivery Fees' }} 
    recordRepresentation="location"
    icon={PaymentsIcon} 
    />

   </Admin>
  );

export default App;