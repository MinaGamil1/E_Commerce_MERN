import {  Box, Container, Typography } from "@mui/material";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect } from "react";

const MyOrdersPage = () => {
  const {getMyOrders,myOrders} = useAuth();

  useEffect(() => {
    getMyOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(myOrders);
  return (
    <Container
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}>
       <Typography variant="h4">My Orders</Typography> 
      {myOrders.map(({  address,orderItems,total,})=>(
      <Box sx={{border:1 ,borderColor:"gray", borderRadius:2, padding:2, width:"100%"}}>
      <Typography variant="h5">Address: {address}</Typography>
      <Typography variant="h5">Items: {orderItems.length}</Typography>
      <Typography variant="h5">Total: {total}</Typography>


      </Box>
    ))}</Container>
  );
};

export default MyOrdersPage;
