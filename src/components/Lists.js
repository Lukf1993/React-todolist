import React from 'react';
import ListItem from '../components/ListItem'
class Lists extends React.Component {

    render() {
        return(
            <ul>{this.props.list.map((item) => (<ListItem {...item}
                    key={item.id}
                    removeItem={this.props.removeItem}
                    changeStatus={this.props.changeStatus}
                    />))}
                {/* {this.state.list.map((item) => (<ListItem featured item={item} />))} */}
            </ul>
        )
    }
}

export default Lists;