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
import { useHistory } from 'react-router-dom';

export const mainListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ExploreIcon />
            </ListItemIcon>
            <ListItemText primary="Explore" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Messages" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <BookmarkIcon />
            </ListItemIcon>
            <ListItemText primary="Bookmarks" />
        </ListItem>
    </div>
);

export function SecondaryListItems() {
    const history = useHistory();

    const logout = () => {
        localStorage.clear();
        history.push("/login")
    }

    return (
        <div>
            <ListSubheader inset>Account</ListSubheader>
            <ListItem button>
                <ListItemIcon>
                    <AccountIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button onClick={logout}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItem>
        </div>
    )
}