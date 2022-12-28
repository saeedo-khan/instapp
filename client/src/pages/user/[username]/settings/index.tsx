import {
  Avatar,
  Box,
  Button,
  Divider,
  FormLabel,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BarLoader } from "react-spinners";
import FormChangePassword from "../../../../components/changePassword/FormChangePassword";
import Meta from "../../../../components/Meta";
import useUsers from "../../../../context/users/UsersContext";
import WithAuth from "../../../../HOCs/WithAuth";

// interface IUpdateUser {
//   name: string;
//   profile_pic_url: string;
//   email: string;
//   gender: string;
//   biography: string;
// }

// interface IUpdateUserDetails {
//   type: string;
//   message: string;
//   data: IUpdateUser[];
// }

const Settings = () => {
  Meta.defaultProps = {
    title: `instapp | settings`,
    keywords: "socail media, interactive with people",
    description: "interactive with people from around the world",
  };

  const [file, setFile] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [biography, setBiography] = useState<string>("");
  const [profilePic, setProfilePic] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const { updateUserData, uploadProfilePic } = useUsers();

  const handleBiography = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBiography(e.target.value);
  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handleGenderChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };

  const handleUpdateClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault();
    updateUserData({ userId, username, biography, email, gender });
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    setFile(fileList[0]);
    setLoading(true);
    const formData = new FormData();
    formData.append("post", fileList[0]);
    fetch("https://instapp.onrender.com/upload_files", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setFile(undefined);
        uploadProfilePic({ pic: data.path, userId });
        setProfilePic(data.path);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const router = useRouter();

  useEffect(() => {
    axios
      .get(`https://instapp.onrender.com/api/users/${router.query.username}`)
      .then((res) => {
        setUsername(res.data.data.user.name);
        setBiography(res.data.data.user.biography);
        setProfilePic(res.data.data.user.profile_pic_url);
        setGender(res.data.data.user.gender);
        setEmail(res.data.data.user.email);
        setUserId(res.data.data.user.id);
      })
      .catch((err) => console.log(err));
  }, []);

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
                <Avatar alt="thumb" src={`${profilePic}`} />
              </Box>
              <Box flex={1}>
                <Button variant="contained" component="label">
                  Upload
                  <input type="file" hidden onChange={handleUploadImage} />
                </Button>
              </Box>
            </Stack>
          </Box>
        </Box>
        <Box>{loading && <BarLoader />}</Box>
        <Divider />
        <Box>
          <TextField
            id="outlined-multiline-static"
            placeholder="Bio"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            name="biography"
            sx={{ fontSize: 16 }}
            value={biography}
            onChange={handleBiography}
          />
        </Box>
        <Divider />
        <Box display="flex" flexDirection="column">
          {/* <FormLabel>username</FormLabel> */}
          <TextField
            id="outlined-basic"
            name="name"
            placeholder="Username"
            value={username}
            sx={{ marginBottom: 3 }}
            onChange={handleUsername}
          />
          <TextField name="email" value={email} disabled={true} />
        </Box>

        <Box>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            autoWidth
            label="gender"
            value={gender}
            onChange={handleGenderChange}
          >
            <MenuItem value={"FEMALE"}>Female</MenuItem>
            <MenuItem value={"MALE"}>Male</MenuItem>
          </Select>
        </Box>

        <FormChangePassword />

        <Box>
          <Typography>Delete account</Typography>
          <Typography>
            by deleting your account, you will lose all your data
          </Typography>
          <Box mt={2}>
            <Button>Delete account</Button>
            <Button>Change Password</Button>
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

export default WithAuth(Settings);
