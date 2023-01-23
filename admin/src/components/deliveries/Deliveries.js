import {
    BooleanField,
    Datagrid,
    SimpleList,
    DateField,
    List,
    NumberField,
    TextField,
    Edit,
    Create,
    BooleanInput,
    NumberInput,
    SimpleForm,
    TextInput,
    useRecordContext
} from 'react-admin';

import { useMediaQuery } from "@mui/material";

export const DeliveryList = () => {

    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));


    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.location}
                    secondaryText={(record) => record.available}
                    tertiaryText={(record) => record.price}
                    linkType="show"
                />
            ) :
                (
                    <Datagrid
                        bulkActionButtons={false}
                    >
                        <TextField source="id" />
                        <TextField source="location" />
                        <NumberField source="price" />
                        <BooleanField source="available" />
                        <DateField source="createdAt" />
                        <DateField source="updatedAt" />
                    </Datagrid>
                )}
        </List>
    )
};

export const SuperDeliveryList = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));


    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.location}
                    secondaryText={(record) => record.available}
                    tertiaryText={(record) => record.price}
                />
            ) :
                (
                    <Datagrid rowClick="edit">
                        <TextField source="id" />
                        <TextField source="location" />
                        <NumberField source="price" />
                        <BooleanField source="available" />
                        <DateField source="createdAt" />
                        <DateField source="updatedAt" />
                    </Datagrid>
                )}
        </List>
    )
};


export const DeliveryEdit = () => (
    <Edit title={<DeliveryTitle />}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="location" />
            <NumberInput source="price" />
            <BooleanInput source="available" />
        </SimpleForm>
    </Edit>
);

export const DeliveryCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="location" />
            <NumberInput source="price" />
        </SimpleForm>
    </Create>
);

const DeliveryTitle = () => {
    const order = useRecordContext();
    return <span>{order ? `${order.location}` : ''}</span>;
};