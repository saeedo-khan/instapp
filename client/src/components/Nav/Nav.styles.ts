import { createStyles, makeStyles } from "@material-ui/core";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
      nav_appbar:{
        backgroundColor: '#181A1B',
        height: 70,
        justifyContent: 'center'
      },
      wraplogo:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      },
      logo:{
        display: 'block',
        width: '103px',
        height: '29px',
        objectFit: 'cover'
      },
      inputSearch:{
        background:'white',
        padding: '0 3px',
        width: '100%',
        height: '100%'
      },
      icons:{
        display: 'flex',
      },
      searching:{
        width: '268px',
        minWidth: '125px',
        height:'36px',
        borderRadius: '3px',
        marginLeft: 'auto',
        marginRight: theme.spacing(2)
      },
      container:{
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]:{
          maxWidth: 'xs',
          display: 'flex',
          alignItems:'center',
          justifyContent: 'flex-end'
        }
      }
    })
)

export default useStyles