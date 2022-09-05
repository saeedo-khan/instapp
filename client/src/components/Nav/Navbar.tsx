import React, { useState } from 'react';
import { AppBar, Container, IconButton, Toolbar,Box, InputBase, Avatar, Modal, Menu, MenuItem } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import instaLogo from '../../assets/735145cfe0a4.png'
import SearchIcon from '@mui/icons-material/Search';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import useStyles from './Nav.styles';
import { useMediaQuery, useTheme } from '@material-ui/core';
import NewPost from '../newPost/NewPost';
import Image from 'next/image';
import { AccountCircle } from '@mui/icons-material';
import Link from 'next/link';



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.10),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.black
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Navbar = () =>  {

  const [open, setOpen] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const classes = useStyles(useStyles)
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  return(
    <>
      <Modal
      open={open}
      onClose={()=> setOpen(false)}
      sx={{display: 'flex',alignItems:'center', justifyContent: 'center'}}
      >
        <NewPost />
      </Modal>

      <AppBar position='sticky' className={classes.nav_appbar}>
          <Toolbar variant='dense'>
            <Container className={classes.container} maxWidth={'lg'}>

              {!isSmall && 
                <Box className={classes.wraplogo}>
                {/* logo */}
                <Link href={'/'}>
                    <Image
                      src={instaLogo}
                      layout='intrinsic'
                      width={90}
                      height={30}
                    />
                  </Link>
                </Box>
              }
              

              <Box className={classes.searching}>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </Search>                  
              </Box>

              <Box className={classes.icons}>

                <Link href={'/'}>
                  <IconButton size='large'>
                    <HomeOutlinedIcon sx={{color: 'rgba(0,0,0,0.6)'}}/>
                  </IconButton>
                </Link>

                  <IconButton  onClick={() => setOpen(true)} size='large'>
                    <AddBoxOutlinedIcon sx={{color: 'rgba(0,0,0,0.6)'}}/>
                  </IconButton>

                  <IconButton
                   size='large'
                   aria-label='account of current user'
                   aria-controls='menu-appbar'
                   aria-haspopup='true'
                   onClick={handleMenu}
                   >
                    <AccountCircle sx={{color: 'rgba(0,0,0,0.6)'}}/>
                  </IconButton>

                  <Menu
                    id='menu-appbar'
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    
                    <MenuItem onClick={handleClose}>
                    <Link href={'/user/saeedx'}>Profile</Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>Settings</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </Menu>
              </Box>

            </Container>
              
          </Toolbar>
      </AppBar>
      </>
  );
}
  
  export default Navbar;
  