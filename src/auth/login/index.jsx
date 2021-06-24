import React, { useState } from 'react';
import { Container, CssBaseline, Avatar, Typography, FormControlLabel, Button,
Checkbox, Grid, Link, makeStyles, Card, CardContent} from '@material-ui/core';

import { LockRounded} from '@material-ui/icons';

import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'

import firebaseAuth from '../../helpers/db'
import {ScaleLoader} from 'react-spinners';


import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Login = (props) => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [rememberpass, setRememberpass] = useState(false)

    const changeMode = `
        display: block;
        margin-left: 100px;
        border-color: blue;
    `;

    const handleLogin = () => {
        
        setLoading(true);
        firebaseAuth.auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                const {user} =  response;
                const data = {
                    userId: user.uid,
                    email: user.email
                }
                localStorage.setItem('user', JSON.stringify(data));
                const storage = localStorage.getItem('user');
                const loggedInUser = storage !== null ? JSON.parse(storage) : null;
                props.loggedIn(loggedInUser);
                setLoading(false);
            }).catch(error => {
                toast.error(error.message);
                setLoading(false);
            });
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleCheck = (e) => {
        setRememberpass(e.target.checked);
    }
    return (
        <Container components="main" maxWidth="xs">
            <Card className={classes.card}>
                <CardContent>
                    
                <ToastContainer/>
                    <CssBaseline/>
                    <div className={classes.paper}>
                         <Avatar className={classes.avatar}>
                             <LockRounded/>
                         </Avatar>
                         <Typography component="h1" variant="h5">
                             Sign In
                         </Typography>
                         <ValidatorForm 
                            onSubmit={handleLogin}
                            onError={errors => {
                                for (const err of errors) {
                                  console.log(err.props.errorMessages[0])
                                }
                                }}
                                className={classes.form}>
                        <TextValidator
                         variant="outlined"
                         margin="normal"
                         fullWidth
                         label="Email"
                         onChange={handleEmail}
                         name="email"
                         value={email}
                         validators={['required', 'isEmail']}
                         errorMessages={['this field is required', 'email is not valid']}
                         autoComplete='off' />
                          <TextValidator
                                variant="outlined"
                                fullWidth
                                label="Password"
                                onChange={handlePassword}
                                name="password"
                                type="password"
                                value={password}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                autoComplete="off"
                            />
                                <FormControlLabel
                            control={<Checkbox value={rememberpass} onChange={(e) => handleCheck(e)}  color="primary" />}
                            label="Remember me"
                        />
                        {loading ? (
                            <ScaleLoader
                            css={changeMode}
                            size={150}
                            color={"#34c9eb"}
                            loading={loading}/>
                        ) : (
                             <Button
                             type="submit"
                             fullWidth
                             variant="contained"
                             className={classes.submit}
                         >
                             Sign In
                         </Button>
                        )}
                        <Grid container>
                                <Grid item>
                                    <Link  onClick={props.toggle} className={classes.pointer} variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                         </ValidatorForm>
                    </div>
                </CardContent>
            </Card>
        </Container>
    );
} 


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,

    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        background: 'linear-gradient(45deg, #6b8dfe 30%, #7b53ff 90%)',
        margin: theme.spacing(3, 0, 2),
        color: '#ff'
    },
    card: {
        marginTop: '60px',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '20px',
    },
    pointer: {
        cursor: 'pointer',
        color: 'blue'
    }
}))

export default Login;