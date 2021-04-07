import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


class Error extends React.Component {
    render() {
        return (
            <Typography variant="h2" >
                Oops! Page not found!
            </Typography>
        )
    }
}
export default Error