import { Box, Container, TextField, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import Button from "@mui/material/Button";
import { useRef } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

const CheckoutPage = () => {
  const { cartItems, totalAmount } = useCart();
  const {token} = useAuth();

    const addressRef =useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const address = addressRef.current?.value;
        if (!address) {
            alert("Please enter a delivery address.");
            return;
        }
        const response = await fetch(`${BASE_URL}/cart/checkout`, {
            method: "POST",
            headers: { "Content-Type": "application/json",
            Authorization:`Bearer ${token}`  
            },
            body: JSON.stringify({   address }),
            });
            if (!response.ok) {
            alert("Unable to process checkout, please try again.");
            return;
            }
            navigate("/order-success");
      }

  const renderCartItems = () => {
    return (
      <Box display="flex" flexDirection="column" gap={2} mt={2}    sx={{
              border: 2,
              borderColor: "#f2f2f2",
              borderRadius: 5,
              padding: 1,
            }}>
        {cartItems.map((item) => (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
         
          >
            <Box display="flex" flexDirection="row" alignItems="center" width="100%" gap={2}>
              <img src={item.image} width={100} />
              <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" width="100%" gap={1}>
                <Typography variant="h5">{item.title}</Typography>
                <Typography>
                  {item.quantity} x {item.unitPrice} EGP
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
        <Box>
          <Typography variant="body2" sx={{textAlign:"right"}}>
            Total Amount : {totalAmount.toFixed(2)} EGP
          </Typography>
        
        </Box>
      </Box>
    );
  };
  return (
    <Container fixed sx={{ mt: 2 , display: "flex", flexDirection: "column", gap: 2 }} >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h4">Checkout</Typography>
      </Box>
      <TextField inputRef={addressRef} label="Delivery Address" fullWidth  name="address"/>
      {renderCartItems()}
        <Button variant="contained" color="primary" fullWidth  onClick={handleSubmit}>
            Pay Now
          </Button>
    </Container>
  );
};
export default CheckoutPage;
