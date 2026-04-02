import { CheckCircleOutline } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";

const orderSuccessPage = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    const handleGoHome = () => {
        navigate("/");
    };
    return (
        <Container sx={{mt:2 ,display:"flex", flexDirection:"column",alignItems:"center", justifyContent:"center" ,gap:2}}>
            <CheckCircleOutline color="success" sx={{fontSize:80, alignSelf:"center"}} />
            <Typography variant="h4">Thanks for your order.</Typography>
            <Typography variant="h6" sx={{textAlign:"center"}}>
                We Started Processing it , and we will gaet back to you soon
                </Typography>
                <Button onClick={handleGoHome} variant="contained">Go To Home</Button>
        </Container>

    );
}

export default orderSuccessPage;