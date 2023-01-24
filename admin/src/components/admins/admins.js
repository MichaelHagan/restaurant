import { 
    BooleanField, 
    Datagrid, 
    SimpleList,
    DateField, 
    EmailField, 
    List, 
    TextField, 
    BooleanInput,
    Edit,
    Create, 
    SimpleForm, 
    TextInput,
    PasswordInput,
    useRecordContext 
} from 'react-admin';


import { useMediaQuery } from "@mui/material";

export const AdminList = () => {

  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.email}
          tertiaryText={(record) => record.superAdmin}
        />
      ) : (
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <BooleanField source="superAdmin" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
        </Datagrid>
        )}
    </List>
    )
};

export const AdminEdit = () => (
    <Edit title={<AdminTitle />}>
        <SimpleForm>
            <TextInput source="id" disabled/>
            <TextInput source="name" />
            <TextInput source="email" />
            <BooleanInput source="superAdmin" />
            <PasswordInput source="password" />
        </SimpleForm>
    </Edit>
);

export const AdminCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="email" />
            <BooleanInput source="superAdmin" />
            <PasswordInput source="password" />
        </SimpleForm>
    </Create>
);

const AdminTitle = () => {
    const admin = useRecordContext();
    return <span>{admin ? `${admin.name}` : ''}</span>;
  };