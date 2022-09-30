import { makeStyles, createStyles } from '@material-ui/core';
import { Theme } from '@mui/material';


const useStyles = makeStyles((theme: Theme) => 
createStyles({
    wrap_post:{
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
            width: '100vw'
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
            width: '100vw'
        }
    },
    subColor:{
        // color: 'rgba(255,255,255,0.5)',
    }
})
)

export default useStyles