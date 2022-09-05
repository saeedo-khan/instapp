import { createStyles, makeStyles } from "@material-ui/core";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        list:{
            display: 'block',
            listStyleType:'none',
            margin: '0 auto',
            textAlign: 'center',
            maxWidth: '700px',
            width:'100%',
            ['@media(max-width:689px)']:{
                
            },
            '& > li':{
                fontSize: '12px',
                display: 'inline-block',
                color:'rgba(var(--f52,142,142,142),1)',
                cursor: 'pointer',
                margin: '0 0.5rem'
            }
        }
    })
)

export default useStyles