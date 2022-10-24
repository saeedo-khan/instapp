import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { BarLoader } from "react-spinners";
import Meta from "../../../../components/Meta";
import useUsers from "../../../../context/users/UsersContext";
import { useSessionStorage } from "../../../../hooks/useSessionStorage";

const Settings = () => {
  Meta.defaultProps = {
    title: `instapp | settings`,
    keywords: "socail media, interactive with people",
    description: "interactive with people from around the world",
  };

  const [userData, setUserData] = useSessionStorage("userData", "");

  const [fileName, setFileName] = useState<string>("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const { updateUserData } = useUsers();

  const initialState = {
    id: null,
    name: null,
    thumbUrl: fileName ? fileName : null,
    gender: null,
    statusMessage: null,
  };
  console.log(fileName);
  const [changeSettings, setChangeSettings] = React.useState(initialState);

  const handleUpdateClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault();
    updateUserData(changeSettings);
  };

  const handleRemoveThumb = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault();
    const thumbData = {
      thumbUrl: null,
    };
    axios
      .put(`http://localhost:3000/users/${userData.id}`, thumbData)
      .then((res) => {
        console.log(res);
        setUserData({
          ...userData,
          thumbUrl: null,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeSettings({
      ...changeSettings,
      [e.target.name]: e.target.value,
    });
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    setFile(fileList[0]);
    setLoading(true);
    const formData = new FormData();
    formData.append("thumb", fileList[0]);
    fetch("http://localhost:3000/upload_thumb", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setFileName(data.file);
        setFile(undefined);
        setUserData({
          ...userData,
          thumbUrl: data.file,
        });
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <>
      <Toaster />
      <Stack
        direction="column"
        spacing={4}
        justifyContent="center"
        maxWidth={800}
        sx={{ margin: "0 auto" }}
      >
        <Box>
          <Typography>Account</Typography>
          <Box mt={3}>
            <Typography>Avatar</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                flex={1}
                justifyContent="center"
                alignItems="center"
                display="flex"
              >
                <Avatar src={fileName ? `${fileName}` : ""} />
              </Box>
              <Box flex={1}>
                <Button variant="contained" component="label">
                  Upload
                  <input type="file" hidden onChange={handleUploadImage} />
                </Button>
                <Button onClick={handleRemoveThumb}>Remove</Button>
              </Box>
            </Stack>
          </Box>
        </Box>
        <Box>{loading && <BarLoader />}</Box>
        <Divider />
        <Box>
          <TextField
            id="outlined-multiline-static"
            label="Bio"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            name="statusMessage"
            sx={{ fontSize: 16 }}
            onChange={handleChange}
          />
        </Box>
        <Divider />
        <Box display="flex" flexDirection="column">
          <TextField
            id="outlined-basic"
            label="Display Name"
            name="name"
            defaultValue={userData.name}
            sx={{ marginBottom: 3 }}
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic-name"
            label="Email"
            name="email"
            defaultValue={userData.email}
            disabled={true}
            onChange={handleChange}
          />
        </Box>

        <Box>
          <Typography>Delete account</Typography>
          <Typography>
            by deleting your account, you will lose all your data
          </Typography>
          <Box mt={2}>
            <Button>Delete account</Button>
          </Box>
        </Box>
        <Box textAlign="center">
          <Button variant="contained" onClick={handleUpdateClick}>
            Save Changes
          </Button>
        </Box>
      </Stack>
    </>
  );
};

export default Settings;
