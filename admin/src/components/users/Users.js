import { 
    BooleanField, 
    Datagrid, 
    SimpleList,
    DateField, 
    EmailField, 
    List, 
    TextField,
    Edit,
    Create, 
    SimpleForm, 
    TextInput,
    PasswordInput,
    useRecordContext 
} from 'react-admin';

import { useMediaQuery } from "@mui/material"

export const UserList = () => {

  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.email}
          tertiaryText={(record) => record.phone_number}
        />
      ) : (
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="phone_number" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
        </Datagrid>
        )}
    </List>
    )
};

export const UserEdit = () => (
    <Edit title={<UserTitle />}>
        <SimpleForm>
            <TextInput source="id" disabled/>
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput source="phone_number" />
            <PasswordInput source="password" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput source="phone_number" />
            <PasswordInput source="password" />
        </SimpleForm>
    </Create>
);

const UserTitle = () => {
    const user = useRecordContext();
    return <span>{user ? `${user.name}` : ''}</span>;
  };