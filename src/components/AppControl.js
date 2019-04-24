import React from 'react';

class AppControl extends React.Component {
    onChange = (e) => {
        this.setState({
            title: e.target.value,
        })
    }
    addTask = (e) => {
        e.preventDefault();
        this.props.addTask(this.state.title);
    }

    render() {
        return(
            <div>
                <form>
                    <input type="text" className="js-addText addText" onChange={this.onChange} placeholder="wpisz coś"></input>
                </form>
                <a href="#" className="App-link js-addObject buttons" onClick={this.addTask}>Dodaj obiekt</a>
                <a href="#" className="App-link js-deleteObject buttons" >Usuń obiekt</a>
            </div>
        )
    }
}

export default AppControl;