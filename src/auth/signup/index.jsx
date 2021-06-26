import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, Avatar, Typography,  Button,
 Grid, Link, makeStyles, Card, CardContent} from '@material-ui/core';

import { LockRounded} from '@material-ui/icons';

import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import firebaseAuth from '../../helpers/db'


import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Signup = (props) => {
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [bvn, setBvn] = useState('')
    const [phoneno, setPhoneno] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSignUp = () => {
        firebaseAuth.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(response => {
            if(response) {
                props.toggle();
                toast.success('User Registered Successfully');
            }
        }).catch((error) => {
            switch(error.code) {
                case 'auth/email-already-in-use':
                    toast.error(error.message);
                    break;
                case 'auth/invalid-email': 
                    toast.error(error.message);                    
                    break;
                case 'auth/weak-password':
                    toast.error(error.message);
                    break;
            }
        });
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handlePhoneno = (e) => {
        setPhoneno(e.target.value);
    }

    const handleBvn = (e) => {
        setBvn(e.target.value)
    }

    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if(value !== password) {
                return false;
            }
            return true;
        });
        return () => {
            ValidatorForm.removeValidationRule('isPasswordMatch');
        }
    }, [password])

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
                             Sign Up
                         </Typography>
                         <ValidatorForm 
                            onSubmit={handleSignUp}
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
                                label="BVN"
                                onChange={handleBvn}
                                name="bvn"
                                type="number"
                                value={bvn}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                autoComplete="off"
                            />
                            <br/>
                            <TextValidator
                                variant="outlined"
                                fullWidth
                                label="Phone Number"
                                onChange={handlePhoneno}
                                name="phoneno"
                                type="number"
                                value={phoneno}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                autoComplete="off"
                            />
                            <br/>
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
                            <br/>
                              <TextValidator
                                variant="outlined"
                                fullWidth
                                label="Confirm Password"
                                onChange={handleConfirmPassword}
                                name="confirmPassword"
                                type="password"
                                validators={['isPasswordMatch', 'required']}
                                errorMessages={['password mismatch', 'this field is required']}
                                value={confirmPassword}
                                autoComplete="off"
                            />
                        <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={classes.submit}
                            >
                                Sign Up
                            </Button>
                            <Grid container>
                                <Grid item>
                                <Link onClick={props.toggle} className={classes.pointer} variant="body2">
                                    {"Already have an account? Sign In"}
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


export default Signup;