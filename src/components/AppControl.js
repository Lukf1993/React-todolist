import React, {useState} from 'react';
import {Context} from  '../App';
import { Button, Select, Input, Divider} from 'antd';



function AppControl(props) {
  // const context = useContext(Context);
  const textInput = React.createRef();
  const [day, setDay] = useState("today");
  const [title, setTitle] = useState("");

  function onChange(e) {
    setTitle(e.target.value);
  };

  function onChangeSelect(value) {
   setDay(value);
  };

  function addTask(title, day) {
    textInput.current.value = '';
    props.addTask(title, day);
  };

    return (
      <Context.Consumer>
        {(context) => (
          <div>
            <form className="flex">
              <Input
                type="text"
                size="large"
                ref={textInput}
                className="js-addText addText"
                onChange={onChange}
                placeholder="wpisz coś">
              </Input>
              <Divider type="vertical" />
              <Select
                defaultValue="today"
                size="large"
                style={{ width: 120 }}
                onChange={onChangeSelect}>
                <Select.Option value="today">Dziś</Select.Option>
                <Select.Option value="tomorrow">Jutro</Select.Option>
              </Select>
            </form>
            <Button
              href="#"
              type='primary'
              icon='file-add'
              className="App-link js-addObject buttons"
              onClick={() => addTask(title, day)}>Dodaj obiekt
            </Button>
            <Button disabled={!props.buttonON}
              href="#"
              type='primary'
              icon='delete'
              className="App-link js-deleteObject buttons"
              onClick={context.removeItemByStatus} >Usuń obiekt
            </Button>
          </div>
        )}

      </Context.Consumer>
    )
}

export default AppControl;
