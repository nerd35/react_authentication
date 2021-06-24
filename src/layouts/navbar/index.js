import React, { useState } from 'react'
import {AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, makeStyles} from '@material-ui/core'
import {AccountCircle} from '@material-ui/icons'

const NavBar = (props) => {
    const classes = useStyles();

const [auth, setAuth] = useState(true);
const [anchorEl, setAnchorEl] = useState(null);
const open = Boolean(anchorEl);

const handleClose = () => {
    localStorage.removeItem('user');
    props.setUserState();
    setAnchorEl(null);
}

const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
}
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.menuBackground}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        React  Authentication
                    </Typography>
                    {auth && (
                        <div>

                        <IconButton
                            aria-label="account Of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle/>

                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical:'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuBackground: {
        background: 'linear-gradient(45deg, #6b8dfe 30%, #7b53ff 90%)',
    },
    title: {
        flexGrow: 1
    }
}));

export default NavBar;
