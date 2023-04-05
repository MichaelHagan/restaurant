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
const validateName = maxLength(30, "Maximum number of characters exceeded.(max:30 characters)");
const validateDescription = maxLength(60, "Maximum number of characters exceeded.(max:60 characters)");

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
      <TextInput source="id" disabled />
      <TextInput source="name" validate={validateName} />
      <TextInput source="description" multiline rows={5} validate={validateDescription} />
      <ImageInput source="imageUrl" label="Food Picture">
        <ImageField source="src" title="title" />
      </ImageInput>
      <NumberInput source="price" />
      <BooleanInput source="available" />
      <SelectInput source="category" choices={[
        { id: 'Breakfast', name: 'Breakfast' },
        { id: 'Dessert', name: 'Dessert' },
        { id: 'Local', name: 'Local' },
        { id: 'Continental', name: 'Continental' }
      ]}
      />
    </SimpleForm>
  </Edit>
  )
};

export const FoodCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={validateName} />
      <TextInput source="description" multiline rows={2} validate={validateDescription} />
      <ImageInput source="imageUrl" label="Food Picture">
        <ImageField source="src" title="title" />
      </ImageInput>
      <TextInput source="imageUrl" />
      <NumberInput source="price" />
      <SelectInput source="category" choices={[
        { id: 'Breakfast', name: 'Breakfast' },
        { id: 'Dessert', name: 'Dessert' },
        { id: 'Local', name: 'Local' },
        { id: 'Continental', name: 'Continental' }
      ]}
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