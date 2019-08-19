import React from 'react';
import { Button } from 'antd';


function ControlListButtons(props) {
  return(
    <div>
      <Button href="#" icon="delete"  className='delete button' onClick={props.removeItem}>Usuń </Button>
      <Button href="#" className='changeStatus button' onClick={props.changeStatus}>Zmień Status</Button>
      <Button disabled={props.editing} href="#" icon="edit"  className='button' onClick={props.edit}>Edytuj</Button>
      <Button disabled={!props.editing} href='#' icon="save"  className='button' onClick={props.save}>Zapisz</Button>
      <Button href="#" icon="swap"  className='button' onClick={props.changeSide}></Button>
    </div>
  )
}

export default ControlListButtons;
