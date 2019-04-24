import React from 'react';
import ControlListButtons from '../components/ControlListButtons';

class ListItem extends React.Component {
    // state = {
    //     title: "",
    //     status: false,
    //     checked: false,
    //     id: Math.floor((Math.random() * 100)),
    // }
    render() {
        return(
            <li>
                <input type='checkbox'></input>
                    <label>
                        <strong>{this.props.title}<p>{this.props.status}</p>
                        </strong>
                    </label><ControlListButtons
                     removeItem={() => this.props.removeItem(this.props.id)}
                     changeStatus={() => this.props.changeStatus(this.props.id)} />
            </li>
        )
    }
}

export default ListItem;