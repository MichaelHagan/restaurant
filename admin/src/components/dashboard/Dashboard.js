import { Card, CardContent, CardHeader } from "@mui/material";


const  name  = localStorage.getItem('name');

export const Dashboard = () => (
  <Card>
    <CardHeader title={`Hello ${name}`} />
    <CardContent>Welcome to the admin panel</CardContent>
  </Card>
);