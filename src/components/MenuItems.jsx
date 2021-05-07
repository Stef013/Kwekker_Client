import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import ExploreIcon from '@material-ui/icons/Explore';
import NotificationsIcon from '@material-ui/icons/NotificationsNoneOutlined';
import MailIcon from '@material-ui/icons/MailOutline';
import BookmarkIcon from '@material-ui/icons/BookmarkOutlined';
import AccountIcon from '@material-ui/icons/AccountCircleOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';
import { useHistory } from 'react-router-dom';

export function MainListItems() {
    const history = useHistory();

    const Home = () => {
        history.push("/")
    }

    const Messages = () => {
        history.push("/messages")
    }

    return (
        <div style={{ marginTop: 20, marginBottom: 20 }}>
            <ListItem button onClick={Home}>
                <ListItemIcon style={{ color: "#03dac5", marginLeft: 40 }}>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button>
                <ListItemIcon style={{ color: "#03dac5", marginLeft: 40 }}>
                    <ExploreIcon />
                </ListItemIcon>
                <ListItemText primary="Explore" />
            </ListItem>
            <ListItem button>
                <ListItemIcon style={{ color: "#03dac5", marginLeft: 40 }}>
                    <NotificationsIcon />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
            </ListItem>
            <ListItem button onClick={Messages}>
                <ListItemIcon style={{ color: "#03dac5", marginLeft: 40 }}>
                    <MailIcon />
                </ListItemIcon>
                <ListItemText primary="Messages" />
            </ListItem>
            <ListItem button>
                <ListItemIcon style={{ color: "#03dac5", marginLeft: 40 }}>
                    <BookmarkIcon />
                </ListItemIcon>
                <ListItemText primary="Bookmarks" />
            </ListItem>
        </div>
    )
}

export function SecondaryListItems() {
    const history = useHistory();

    const logout = () => {
        localStorage.clear();
        history.push("/login")
    }

    const profile = () => {
        history.push("/profile")
    }

    return (
        <div>
            <ListSubheader inset style={{ marginLeft: 40 }}>Account</ListSubheader>
            <ListItem button onClick={profile}>
                <ListItemIcon style={{ color: "#03dac5", marginLeft: 40 }}>
                    <AccountIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button>
                <ListItemIcon style={{ color: "#03dac5", marginLeft: 40 }} >
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button onClick={logout}>
                <ListItemIcon style={{ color: "#f50057", marginLeft: 40 }} >
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItem>
        </div>
    )
}