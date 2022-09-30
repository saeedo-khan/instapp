import React from "react";
import { Formik } from "formik";
import { createStyles, makeStyles } from "@material-ui/core";
import {
  Box,
  Paper,
  Button,
  Typography,
  TextField,
  Theme,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import instagramLetter from "../../../assets/44c3aac.png";
import { useRouter } from "next/router";

import { SignupSchema } from "../../../validations/userValidate";
import useAuth from "../../../context/auth/AuthContext";

interface indexProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    signup: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    container: {
      width: 550,
      height: 600,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      marginBottom: theme.spacing(2),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      [theme.breakpoints.down("sm")]: {
        zIndex: -1,
        visibility: "hidden",
        padding: 0,
      },
    },
    formLogin: {
      marginTop: theme.spacing(1),
      width: "70%",
      [theme.breakpoints.down("sm")]: {
        zIndex: "10",
        visibility: "visible",
      },
    },
    line: {
      width: 80,
      height: 1,
      display: "block",
      position: "relative",
      background: "rgba(255,255,255,1)",
    },
    btn: {
      marginTop: theme.spacing(5),
      fontSize: 12,
      margin: "0 auto",
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },

    container_line: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: theme.spacing(2),
    },
    fb_btn: {
      marginTop: theme.spacing(2),
    },
    fb_text: {
      color: "white",
      fontSize: 14,
      fontWeight: 600,
      textTransform: "capitalize",
      cursor: "pointer",
    },
    login_field: {
      marginTop: theme.spacing(2),
    },
  })
);

interface RegisterVal {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC<indexProps> = ({}) => {
  const classes = useStyles();
  const router = useRouter();
  const initialValues: RegisterVal = { name: "", email: "", password: "" };
  const { signUp, loading } = useAuth();

  return (
    <Box className={classes.signup}>
      <Box className={classes.container}>
        <Image src={instagramLetter} alt="instaLetter" layout="intrinsic" />
        {loading ? (
          <CircularProgress />
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              signUp(values.name, values.email, values.password);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form className={classes.formLogin} onSubmit={handleSubmit}>
                <TextField
                  type="name"
                  name="name"
                  label="Username"
                  InputLabelProps={{
                    style: {
                      color: "white",
                    },
                  }}
                  className={classes.login_field}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  fullWidth
                />
                <Box sx={{ color: "red" }}>
                  {errors.name && touched.name && errors.name}
                </Box>

                <TextField
                  type="email"
                  name="email"
                  label="Email"
                  InputLabelProps={{
                    style: {
                      color: "white",
                    },
                  }}
                  className={classes.login_field}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  fullWidth
                />
                <Box sx={{ color: "red" }}>
                  {errors.email && touched.email && errors.email}
                </Box>
                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  InputLabelProps={{
                    style: {
                      color: "white",
                    },
                  }}
                  className={classes.login_field}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  fullWidth
                />
                <Box sx={{ color: "red" }}>
                  {errors.password && touched.password && errors.password}
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  fullWidth
                  type="submit"
                  disabled={isSubmitting}
                  className={classes.btn}
                >
                  Register
                </Button>

                <Box className={classes.container_line}>
                  <Box
                    sx={{
                      color: " rgba(var(--f52,142,142,142),1)",
                      fontSize: "12px",
                    }}
                  >
                    OR
                  </Box>
                </Box>

                <Box mt={4} textAlign="center">
                  <Typography
                    variant="body2"
                    className={classes.fb_text}
                    onClick={() => router.push("/auth/login")}
                  >
                    if you have an account? Login
                  </Typography>
                </Box>
              </form>
            )}
          </Formik>
        )}
      </Box>
    </Box>
  );
};

export default Signup;
