import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

export default function Navbar() {
    return (
        <div>
            <Button component={Link} to="/">
                To Login
            </Button>
            <Button component={Link} to="/test">
                To Error
            </Button>
        </div>
    );
};
