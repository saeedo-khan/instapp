import { makeStyles, createStyles } from '@material-ui/core';
import { Theme } from '@mui/material';


const useStyles = makeStyles((theme: Theme) => 
createStyles({
    wrap_post:{
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(10),
    },
    userInfo:{
        display: 'flex',
        alignItems: 'center',
        marginLeft: theme.spacing(1)
    },
    field_section:{
        flex: '0 1 80%',
        [theme.breakpoints.down('lg')]:{
            flex: '0 1 80%'
        }
    },
    add_post:{
        cursor: 'pointer',
        marginLeft: 'auto',
        paddingRight: theme.spacing(2)
    },
    image_wrap:{
        height: 700,
        width: 700,
        position: 'relative',
        [theme.breakpoints.down('sm')]:{
            height: 500,
            width:500
        },
        [theme.breakpoints.down('xs')]:{
            height: 300,
            width: 300
        }
    },
    collapse:{
        height: 700,
        width: 700,
        [theme.breakpoints.down('sm')]:{
            height: 500,
            width:500
        },
        [theme.breakpoints.down('xs')]:{
            height: 300,
            width: 300
        }
    }
})
)

export default useStyles