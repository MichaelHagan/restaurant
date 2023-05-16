import {
  BooleanField,
  useRecordContext,
  Datagrid,
  DateField,
  List,
  NumberField,
  TextField,
  BooleanInput,
  Edit,
  Create,
  NumberInput,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
  SimpleList,
  SelectInput,
  maxLength
} from 'react-admin';

import { useMediaQuery } from "@mui/material"
import './Food.scss'
const validateName = maxLength(30, "Maximum number of characters exceeded.(max:30 characters)");
const validateDescription = maxLength(120, "Maximum number of characters exceeded.(max:60 characters)");

export const SuperFoodList = () => {

  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List
      // filters={foodFilters}
    >
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.description}
          tertiaryText={(record) => record.price}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="name" />
          <TextField source="description" />
          <TextField source="imageUrl" style={{ display: 'inline-block', maxWidth: '20em', overflow: 'hidden', textOverflow: 'ellipsis' }}/>
          <NumberField source="price" />
          <BooleanField source="available" />
          <TextField source="category" />
          <DateField source="createdAt" />
          <DateField source="updatedAt" />
        </Datagrid>
      )}
    </List>
  )
};

export const FoodList = () => {

  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List
      // filters={foodFilters}
    >
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.description}
          tertiaryText={(record) => record.price}
          linkType="show"
        />
      ) : (
        <Datagrid
          bulkActionButtons={false}
        >
          <TextField source="id" />
          <TextField source="name" />
          <TextField source="description" />
          <TextField source="imageUrl" />
          <NumberField source="price" />
          <BooleanField source="available" />
          <TextField source="category" />
          <DateField source="createdAt" />
          <DateField source="updatedAt" />
        </Datagrid>
      )}
    </List>
  )
};


export const FoodEdit = () => {

  return (
    <Edit title={<FoodTitle />}>
    <SimpleForm>
      <TextInput source="id" disabled style={{ width: '10%' }}/>
      <TextInput source="name" validate={validateName} style={{ width: '40%' }}/>
      <TextInput source="description" multiline rows={5} validate={validateDescription} style={{ width: '40%' }}/>
      <TextInput source="imageUrl" style={{ width: '100%' }} label="Current Image Url" disabled />
      <ImageInput source="imageUrl" label="Change Image">
        <ImageField source="src" title="title" />
      </ImageInput>
      <NumberInput source="price" style={{ width: '20%' }}/>
      <BooleanInput source="available" />
      <SelectInput source="category" choices={[
        { id: 'Breakfast', name: 'Breakfast' },
        { id: 'Dessert', name: 'Dessert' },
        { id: 'Local', name: 'Local' },
        { id: 'Continental', name: 'Continental' }
      ]}
      style={{ width: '20%' }}
      />
    </SimpleForm>
  </Edit>
  )
};

export const FoodCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={validateName} style={{ width: '40%' }}/>
      <TextInput source="description" multiline rows={2} validate={validateDescription} style={{ width: '40%' }}/>
      <ImageInput source="imageUrl" label="Image">
        <ImageField source="src" title="title" />
      </ImageInput>
      <NumberInput source="price" style={{ width: '20%' }} />
      <SelectInput source="category" choices={[
        { id: 'Breakfast', name: 'Breakfast' },
        { id: 'Dessert', name: 'Dessert' },
        { id: 'Local', name: 'Local' },
        { id: 'Continental', name: 'Continental' }
      ]}
      style={{ width: '20%' }}
      />
    </SimpleForm>
  </Create>
);

const FoodTitle = () => {
  const food = useRecordContext();
  return <span>{food ? `${food.name}` : ''}</span>;
};

// const foodFilters = [
//   <TextInput source="q" label="Search" alwaysOn />,
//   <ReferenceInput source="category" label="Category" reference="foods/category" />,
// ];