import React from "react";
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

function PhoneList(props) {

  return (
    <div>
        <List
            sx={{
                width: '100%',
                maxWidth: 360,
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,
                '& ul': { padding: 0 },
            }}
            subheader={<li />}
        >

            <ul>
                <ListSubheader>{`Phone Numbers`}</ListSubheader>
                {props.data.map((item, i) => (
                    <ListItem key={`item-${i}`}>
                        <ListItemText primary={item.code + item.phone} />
                    </ListItem>
                ))}
            </ul>

        </List>
    </div>
  );
}

function mapStateToProps(state) {
    return {
        data: state.data
    }
}

export default connect(mapStateToProps)(PhoneList);
