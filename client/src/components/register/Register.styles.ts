import { createStyles, makeStyles } from "@material-ui/core";
import { Theme } from '@mui/material'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        wrap_signup:{
            width: '900px',
            background: 'white',
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(5),
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        },
        logo_wrap:{
            textAlign: 'center',
            marginBottom: theme.spacing(5)
        },
        form_signup:{
            display: 'flex',
            alignItems:'center',
            justifyContent: 'center',
        },
        field:{
            width: '70%',
            marginBottom: theme.spacing(2)
        },
        btn_signup:{
            width: '40%',
            marginTop: theme.spacing(5),
            marginBottom: theme.spacing(2),
            fontSize: 18,
        }
    })
)

export default useStyles