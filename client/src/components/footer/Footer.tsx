import React from "react";
import { Container, Box, Select, MenuItem } from "@mui/material";
import useStyles from "./Footer.styles";

const Footer = ({}) => {
  const classes = useStyles(useStyles);
  return (
    <Box sx={{ width: "100%" }} mt={8}>
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 1,
            fontSize: "12px",
            color: "rgba(var(--f52,142,142,142),1)",
            paddingY: 1,
          }}
        >
          <Box>© 2022 Instagram from Meta</Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
