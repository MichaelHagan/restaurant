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
  ReferenceInput,
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
      filters={foodFilters}
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
      filters={foodFilters}
    >
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.description}
          tertiaryText={(record) => record.price}
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


export const FoodEdit = () => (
  <Edit title={<FoodTitle />}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" validate={validateName} />
      <TextInput source="description" multiline rows={5} validate={validateDescription} />
      <TextInput source="imageUrl" />
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
);

export const FoodCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={validateName} />
      <TextInput source="description" multiline rows={2} validate={validateDescription} />
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

const foodFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <ReferenceInput source="category" label="Category" reference="category" />,
];

/*

export const PostList = () => (
  <List  filters={postFilters}>
    <Datagrid>
      <TextField source="id" />  
      <ReferenceField source="userId" reference="users" />
      <TextField source="title" />
      <EditButton />
    </Datagrid>
  </List>
);


export const PostEdit = () => (
  <Edit title={<PostTitle />}>
    <SimpleForm>
    <TextInput source="id" disabled />
      <ReferenceInput source="userId" reference="users" />
      <TextInput source="title" />
      <TextInput source="body" multiline rows={5} />
    </SimpleForm>
  </Edit>
);

export const PostCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput source="userId" reference="users" />
      <TextInput source="title" />
      <TextInput source="body" multiline rows={5} />
    </SimpleForm>
  </Create>
);

const PostTitle = () => {
    const record = useRecordContext();
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
  };

  const postFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" />,
];

*/