import React, { useState } from 'react'
import { Button, Box, FormControl, TextField } from '@mui/material';
import logo from '../../assets/44c3aac.png'
import Image from 'next/image';
import useStyles from './Register.styles';

const Signup = ({}) => {

    const classes = useStyles(useStyles)

    const initialVal = {username: '', email: '', password: ''} 
    const [formValues, setFormValues] = useState(initialVal)


    return (
        <Box className={classes.wrap_signup}>

            <Box className={classes.logo_wrap}>
                <Image
                    src={logo}
                    alt='logo'
                    layout='intrinsic'
                />
            </Box>
            
            
            <FormControl className={classes.form_signup}>
                
            <TextField
            className={classes.field}
            helperText="Please enter your email"
            label="Email"
            required
            value={formValues.email}
            name="email"                
            />

            <TextField
            className={classes.field}
            helperText="Please enter your name"
            label="Username"
            required
            name='username'
            value={formValues.username}
            />

            <TextField
            className={classes.field}
            helperText="Please enter your password"
            label="Password"
            type='password'
            required
            name='password'
            value={formValues.password}
            />

            <TextField
            className={classes.field}
            helperText="Please enter your password"
            label="Repeat Password"
            type='password'
            required
            />

            <Button 
            className={classes.btn_signup}
            variant='contained' 
            type='submit'
            >SignUp</Button>

            </FormControl>
        </Box>
    );
}

export default Signup