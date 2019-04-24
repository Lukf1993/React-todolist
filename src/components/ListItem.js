import React from 'react';
import ControlListButtons from '../components/ControlListButtons';

class ListItem extends React.Component {
    onChangee = () => {
        this.props.changeStatus(this.props.id)
    }

    render() {
        return(
            <li>
                <input type='checkbox' onChange={this.onChangee}></input>
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