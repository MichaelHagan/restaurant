import {
  Datagrid,
  SimpleList,
  DateField,
  List,
  NumberField,
  TextField,
  Edit,
  SaveButton,
  Toolbar,
  Create,
  NumberInput,
  SimpleForm,
  TextInput,
  useRecordContext,
  ReferenceField,
  SelectInput,
  BooleanInput,
  BooleanField,
} from 'react-admin';

import { useMediaQuery } from "@mui/material";



export const OrderList = () => {

  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.customer_name}
          secondaryText={(record) => record.customer_number}
          tertiaryText={(record) => record.total_price}
        />
      ) :
        (
          <Datagrid rowClick="edit"
            bulkActionButtons={false}
          >
            <TextField source="id" />
            <TextField source="details" />
            <TextField source="customer_name" />
            <TextField source="customer_number" />
            <NumberField source="total_price" />
            <ReferenceField source="DeliveryFeeId" reference="deliveries" label="Delivery" />
            <TextField source="order_state" />
            <BooleanField source="payment" />
            <TextField source="payment_type" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
          </Datagrid>
        )}
    </List>
  )
};


export const SuperOrderList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.customer_name}
          secondaryText={(record) => record.customer_number}
          tertiaryText={(record) => record.total_price}
        />
      ) :
        (
          <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="details" />
            <TextField source="customer_name" />
            <TextField source="customer_number" />
            <NumberField source="total_price" />
            <ReferenceField source="DeliveryFeeId" reference="deliveries" label="Delivery" />
            <TextField source="order_state" />
            <BooleanField source="payment" />
            <TextField source="payment_type" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
          </Datagrid>
        )}
    </List>
  )
};

export const SuperOrderEdit = () => (
  <Edit title={<OrderTitle />}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="details" multiline rows={5} />
      <TextInput source="customer_name" />
      <TextInput source="customer_number" />
      <NumberInput source="total_price" />
      <SelectInput source="order_state" choices={[
        { id: 'New', name: 'New' },
        { id: 'Preparing', name: 'Preparing' },
        { id: 'Awaiting Pickup', name: 'Awaiting Pickup' },
        { id: 'On Delivery', name: 'On Delivery' },
        { id: 'Delivered', name: 'Delivered' },
        { id: 'Cancelled', name: 'Cancelled' }
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

export const OrderEdit = () => (
  <Edit title={<OrderTitle />}>
    <SimpleForm toolbar={<OrderEditToolbar />}>
      <TextInput source="id" disabled />
      <TextInput source="details" multiline rows={5} />
      <TextInput source="customer_name" />
      <TextInput source="customer_number" />
      <NumberInput source="total_price" />
      <SelectInput source="order_state" choices={[
        { id: 'New', name: 'New' },
        { id: 'Preparing', name: 'Preparing' },
        { id: 'Awaiting Pickup', name: 'Awaiting Pickup' },
        { id: 'On Delivery', name: 'On Delivery' },
        { id: 'Delivered', name: 'Delivered' },
        { id: 'Cancelled', name: 'Cancelled' }
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
      <TextInput source="details" multiline rows={5} />
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

const OrderEditToolbar = props => (
  <Toolbar {...props} >
    <SaveButton />
  </Toolbar>
);