import React, { useEffect, useState } from "react";
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Box,
  InputBase,
  Modal,
  Menu,
  MenuItem,
  Avatar,
  ListItem,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import instaLogo from "../../assets/735145cfe0a4.png";
import { IoInvertModeSharp, IoInvertModeOutline } from "react-icons/io5";
import { useTheme as useNextTheme } from "next-themes";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import useStyles from "./Nav.styles";
import { useMediaQuery, useTheme } from "@material-ui/core";
import NewPost from "../newPost/NewPost";
import Image from "next/image";
import { AccountCircle, Light } from "@mui/icons-material";
import Link from "next/link";
import useAuth from "../../context/auth/AuthContext";
import { useRouter } from "next/router";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import axios from "axios";
import { IUser } from "../../interfaces/types";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

type SearchUsers = { type: string; message: string; data: { users: IUser[] } };

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const [searchingUsers, setSearchingUsers] = useState<IUser[]>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const router = useRouter();

  const [user] = useLocalStorage("userData", "");

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logOut();
  };

  const { logOut } = useAuth();

  const { setTheme } = useNextTheme();

  const classes = useStyles(useStyles);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  function changeTheme() {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
    setTheme(mode);
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSearch(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    setShowSearch(false);
  };

  useEffect(() => {
    const getSearchingResults = async () => {
      const res = await axios.get(
        `https://instapp-two.vercel.app/api/search/?q=${searchQuery}`
      );

      setSearchingUsers(res.data.data.users);
    };
    getSearchingResults();
  }, [searchQuery]);

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <NewPost modelStatus={setOpen} />
      </Modal>

      <AppBar position="sticky" className={classes.nav_appbar}>
        <Toolbar variant="dense">
          <Container className={classes.container} maxWidth={"lg"}>
            {!isSmall && (
              <Box className={classes.wraplogo}>
                {/* logo */}
                <Link href={"/"}>
                  <Image
                    src={instaLogo}
                    alt="Logo"
                    layout="intrinsic"
                    width={90}
                    height={30}
                  />
                </Link>
              </Box>
            )}

            <Box className={classes.searching}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  onChange={handleSearch}
                  onBlur={handleBlur}
                  value={searchQuery}
                />
              </Search>
              {showSearch && (
                <List
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.9)",
                    mt: 0.1,
                    ml: 1,
                  }}
                >
                  {searchingUsers?.map((user) => (
                    <ListItem key={user.id}>
                      <Link href={`/user/${user.name}`}>
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar
                              sizes="small"
                              src={`${user.profile_pic_url}`}
                            >
                              {user.name.charAt(0)}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText id="labelId" primary={user.name} />
                        </ListItemButton>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>

            <Box className={classes.icons}>
              <IconButton size="medium" onClick={changeTheme}>
                {mode === "dark" ? (
                  <IoInvertModeSharp />
                ) : (
                  <IoInvertModeOutline />
                )}
              </IconButton>

              <Link href={"/"}>
                <IconButton size="large">
                  <HomeOutlinedIcon sx={{ color: "rgba(255,255,255,0.5)" }} />
                </IconButton>
              </Link>

              {router.pathname === "/" && (
                <IconButton onClick={() => setOpen(true)} size="large">
                  <AddBoxOutlinedIcon sx={{ color: "rgba(255,255,255,0.5)" }} />
                </IconButton>
              )}

              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <AccountCircle sx={{ color: "rgba(255,255,255,0.5)" }} />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    router.replace(`/user/${user.name}`);
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    router.replace(`/user/${user.name}/settings`);
                  }}
                >
                  Settings
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Add Friends
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
