import { AppBar, Toolbar, Container, Typography } from "@mui/material"

const Footer = () => {
  return (
    <AppBar position="static" color="default" sx={{marginBottom: "0"}}>
      <Toolbar>
        <Container maxWidth="md">
          <Typography variant="h5" color="inherit" textAlign="center" fontFamily={"Fira Sans"}>
            Hello, I am  the Footer.
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default Footer
