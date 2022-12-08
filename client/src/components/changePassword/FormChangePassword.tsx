import {
  Box,
  Button,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import useUsers from "../../context/users/UsersContext";
import { NewPasswordValid } from "../../validations/userValidate";

interface indexProps {}

interface IChangePass {
  currentPassword: string;
  newPass: string;
}

const FormChangePassword: React.FC<indexProps> = () => {
  const initialValues: IChangePass = { currentPassword: "", newPass: "" };
  const { changePassword } = useUsers();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NewPasswordValid}
      onSubmit={(values) => {
        changePassword(values.currentPassword, values.newPass);
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
        <Box display="flex" flexDirection="column">
          <Typography>Change Password</Typography>
          <form onSubmit={handleSubmit}>
            <Box mt={1} mb={1}>
              <br />
              <TextField
                type="password"
                name="currentPassword"
                label="currentPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.currentPassword}
                fullWidth
              />
            </Box>
            <Box sx={{ color: "red" }}>
              {errors.currentPassword &&
                touched.currentPassword &&
                errors.currentPassword}
            </Box>
            <Box mb={1}>
              <br />
              <TextField
                type="password"
                name="newPass"
                label="New Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.newPass}
                fullWidth
              />
            </Box>
            <Box sx={{ color: "red" }}>
              {errors.newPass && touched.newPass && errors.newPass}
            </Box>

            <Box mt={1}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                type="submit"
                disabled={isSubmitting}
                sx={{
                  fontSize: 12,
                  margin: "0 auto",
                  pt: 1,
                  pb: 1,
                }}
              >
                Change Password
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </Formik>
  );
};

export default FormChangePassword;
