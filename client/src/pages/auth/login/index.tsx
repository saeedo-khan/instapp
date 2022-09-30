import React from "react";
import { Formik } from "formik";
import { Box, Button, Typography, TextField, Theme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import instagramLetter from "../../../assets/44c3aac.png";
import Image from "next/image";
import { createStyles, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import { LoginSchema } from "../../../validations/userValidate";
import useAuth from "../../../context/auth/AuthContext";

interface indexProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    login: {
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
        zIndex: 10,
        visibility: "visible",
      },
    },
    password: {
      width: 268,
      height: 38,
      margin: theme.spacing(1),
      fontSize: 16,
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
      color: "rgba(255,255,255,.7)",
      fontSize: 14,
      fontWeight: 600,
      textTransform: "capitalize",
      cursor: "pointer",
    },
    login_field: {
      marginTop: theme.spacing(2),
      color: "white",
    },
  })
);

interface LoginVal {
  email: string;
  password: string;
}

const Login: React.FC<indexProps> = ({}) => {
  const classes = useStyles();
  const router = useRouter();
  const initialValues: LoginVal = { email: "", password: "" };
  const { login, loading } = useAuth();

  return (
    <Box className={classes.login}>
      <Box className={classes.container}>
        <Image src={instagramLetter} alt="instaLetter" layout="intrinsic" />
        {loading ? (
          <CircularProgress sx={{ marginTop: "1rem" }} />
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              login(values.email, values.password);
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
                  type="email"
                  name="email"
                  label="Email"
                  InputLabelProps={{
                    style: {
                      // color: "rgba(255,255,255,.7)",
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
                      // color: "rgba(255,255,255,.7)",
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
                  Login
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
                    onClick={() => router.push("/auth/signup")}
                  >
                    if you dont have an account? Register
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

export default Login;
