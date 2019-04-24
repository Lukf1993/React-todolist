import React from 'react';

class ControlListButtons extends React.Component {
    render() {
        return(
            <div>
                <button className='button' onClick={this.props.removeItem}>Usuń</button>
                <button className='changeStatus' onClick={this.props.changeStatus}>Zmień Status</button>
            </div>
        )
    }
}

export default ControlListButtons;