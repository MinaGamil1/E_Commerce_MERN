import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ProductCard from "../components/ProductCard";
import { useEffect } from "react";
import { useState } from "react";
import type { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseUrl";
import Box from "@mui/material/Box";
const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error,setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
      const response = await fetch(`${BASE_URL}/products`);
      const data = await response.json();
      setProducts(data);} catch{
        setError(true);
      }
    };
    fetchData();
  }, []);
  if(error){
    return <Box>someting went wrong , pleas try agin!</Box>
  }
  return (
    <Container maxWidth={false} sx={{ mt: 2, px: 0 }}>
      <Grid container spacing={2} >
        {products.map((p) => (
          <Grid size={{md: 4}}>
            <ProductCard {...p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
