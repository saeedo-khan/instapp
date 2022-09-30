import { makeStyles, createStyles } from "@material-ui/core";
import { Theme } from "@mui/material";


const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        newPost:{
            color: '#fff',
            zIndex: theme.zIndex.drawer + 1,
            width: 500,
            paddingBottom: theme.spacing(2),
            backgroundColor: '#181A1B',
            borderRadius: '10px',
            [theme.breakpoints.down('sm')]:{
                width: '90%'
            }
        },
        wrap_post:{
            height: '100%',
        },
        top_nav_post:{
            padding: '0.5rem 0',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '3rem'
        },
        text_nav_post:{
            flex: 1,
            textAlign: 'center',
        },
        text_nav:{
            color:'rgba(255,255,255,0.8)', 
            fontWeight: 500,
            fontSize: 23,
            [theme.breakpoints.down('sm')]:{
                fontSize: 17
            }
        },
        btn_post:{
            display: 'block',
            textTransform: 'capitalize',
        },
        newpost_body:{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            height: '100%'
        },
        files_detail:{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },
        file_input:{
            width: '100%',
            color: 'rgba(255,255,255,0.7)',
            [theme.breakpoints.down('sm')]:{
                width: '80%'
            }
        },
        text_caption:{
            width: '70%',
            wordBreak: 'break-all',
            resize: 'none',
            padding: '0.5rem',
            minHeight: '60px',
            fontFamily: 'sans-serif',
            marginTop: '1rem',
            fontSize: 14,
            lineHeight: 1.2,
            [theme.breakpoints.down('sm')]:{
                width: '80%',
                fontSize: 13,
            }
        },
        addFile_text:{
            fontSize: 30,
            color: '#1565C0',
            [theme.breakpoints.down('sm')]:{
                fontSize: 20
            }
        },
        category_field:{
            marginLeft: theme.spacing(1)
        }
    })
)

export default useStyles