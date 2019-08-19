import React from 'react';
import ListItem from '../components/ListItem'
import {Typography} from 'antd';

function Lists(props) {
  return(
    <div>
    <Typography.Text code>{props.day === "today" ? 'Dziś' : 'Jutro'}</Typography.Text>
      <ul className="list">
        {props.list.map(
          (item) => (<ListItem {...item} key={item.id} saveList={props.saveList} />)
        )}
      </ul>
    </div>
  )
}

export default Lists;


