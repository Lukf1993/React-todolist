import React, {useState} from 'react';
import ControlListButtons from '../components/ControlListButtons';
import {Context} from  '../App';
import { Input } from 'antd';

function ListItem(props) {
  // const context = useContext(Context);
  const newForm = {
    editing: false,
    newText: props.title,

  };
  const [editForm, setEditForm] = useState(newForm);

  function edit() {
    setEditForm(state => ({
      ...state,
      editing: true
    }))
  }

  const handleChange = (event) => {
    setEditForm({newText: event.target.value, editing: true})
  };

  function renderNormal() {
    return (
      <Context.Consumer>
        {(context) => (
          <li className={`list_item ${props.done === true ? 'done' : 'toDo'}`}>
            <input type='checkbox' onChange={() => props.changeStatus(props.id)}></input>
            <label>
              <p>{props.title}</p>
            </label>

            <ControlListButtons
              day={props.day}
              removeItem={ () => context.deleteItem(props.id)}
              changeStatus={ () => context.switchStatus(props.id)}
              changeSide={ () => context.switchSide(props.id)}
              edit={ () => edit() }
              editing= {editForm.editing}
              />
          </li>
        )}
      </Context.Consumer>
    )
  }

  function renderForm() {
    return (
      <Context.Consumer>
      {(context) => (
        <li className={`list_item ${props.status === true ? 'done' : 'toDo'}`}>
          <input type='checkbox' onChange={() => props.changeStatus(props.id)}></input>

          <Input.TextArea value={editForm.newText} onChange={handleChange}></Input.TextArea>

          <ControlListButtons
            day={props.day}
            removeItem={ () => context.deleteItem(props.id)}
            changeStatus={ () => context.switchStatus(props.id)}
            changeSide={ () => context.switchSide(props.id)}
            save={ () => context.saveChanges(props.id, editForm, setEditForm) }
            editing= {editForm.editing}
            />
        </li>
        )}
      </Context.Consumer>
    )
  }

  function render() {
    if (editForm.editing) {
      return renderForm()
    }else {
      return renderNormal()
    }
  }

  return (
    render()
  )
}

export default ListItem;
