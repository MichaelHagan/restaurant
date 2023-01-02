import { 
  Datagrid, 
  DateField, 
  List, 
  NumberField, 
  TextField, 
  Edit,
  Create, 
  NumberInput, 
  SimpleForm, 
  TextInput,
  useRecordContext,
  ReferenceField,
  SelectInput,
  BooleanInput,
  BooleanField
} from 'react-admin';

export const OrderList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="details" />
            <TextField source="customer_name" />
            <TextField source="customer_number" />
            <NumberField source="total_price" />
            <ReferenceField source="DeliveryFeeId" reference="deliveries" label="Delivery"/>
            <TextField source="order_state" />
            <BooleanField source="payment" />
            <TextField source="payment_type" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
        </Datagrid>
    </List>
);


export const OrderEdit = () => (
    <Edit title={<OrderTitle />}>
        <SimpleForm>
            <TextInput source="id"  disabled/>
            <TextInput source="details" multiline rows={5}/>
            <TextInput source="customer_name" />
            <TextInput source="customer_number" />
            <NumberInput source="total_price" />
            <SelectInput source="order_state" choices={[
              { id: 'New', name: 'New' },
              { id: 'Preparing', name: 'Preparing' },
              { id: 'Awaiting Pickup', name: 'Awaiting Pickup' },
              { id: 'On Delivery', name: 'On Delivery' },
              { id: 'Delivered', name: 'Delivered' }
              ]} 
            />
            <SelectInput source="payment_type" choices={[
              { id: 'Cash', name: 'Cash' },
              { id: 'Cash Credit', name: 'Cash Credit' },
              { id: 'Credit', name: 'Credit' }
              ]} 
            />
            <BooleanInput source="payment" />
        </SimpleForm>
    </Edit>
);


export const OrderCreate = () => (
  <Create>
      <SimpleForm>
          <TextInput source="details" multiline rows={5}/>
          <TextInput source="customer_name" />
          <TextInput source="customer_number" />
          <NumberInput source="total_price" />
          <SelectInput source="order_state" choices={[
              { id: 'New', name: 'New' },
              { id: 'Preparing', name: 'Preparing' },
              { id: 'Awaiting Pickup', name: 'Awaiting Pickup' },
              { id: 'On Delivery', name: 'On Delivery' },
              { id: 'Delivered', name: 'Delivered' }
              ]} 
            />
            
            <SelectInput source="payment_type" choices={[
              { id: 'Cash', name: 'Cash' },
              { id: 'Cash Credit', name: 'Cash Credit' },
              { id: 'Credit', name: 'Credit' }
              ]} 
            />
            <BooleanInput source="payment" />
      </SimpleForm>
  </Create>
);

const OrderTitle = () => {
  const order = useRecordContext();
  return <span>{order ? `${order.customer_name}` : ''}</span>;
};


/*
import { useMediaQuery } from "@mui/material";
import MyUrlField from '../myurlfield/MyUrlField';
import { List, SimpleList, Datagrid, TextField, EmailField } from "react-admin";

export const UserList = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    return (
      <List>
        {isSmall ? (
          <SimpleList
            primaryText={(record) => record.name}
            secondaryText={(record) => record.username}
            tertiaryText={(record) => record.email}
          />
        ) : (
          <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="phone" />
            <MyUrlField source="website" />
            <TextField source="company.name" />
          </Datagrid>
        )}
      </List>
    );
  };


import { List, SimpleList } from "react-admin";

export const UserList = () => (
  <List>
    <SimpleList
      primaryText={(record) => record.name}
      secondaryText={(record) => record.username}
      tertiaryText={(record) => record.email}
    />
  </List>
);
*/