import React, {useContext, useState, useEffect} from 'react';
import AppControl from './components/AppControl';
import Lists from './components/Lists';
import firebase, {uiConfig, dbCollection, logOut, getData, userAuthentication} from './config/fireBaseConfig';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Clock from 'react-live-clock';
import {Button, Layout} from 'antd';
import {contextObject} from './components/context'
import 'antd/dist/antd.css';
import './App.css';




const Context = React.createContext([]);

function App(){

  const newContext = useContext(Context);
  let [list, setList] = useState(newContext);
  let [login, setLogin] = useState(false);
  let [uid, setUid] = useState('');
  let [loading, setLoading] = useState(false);
  let [buttDisable, setButtDisable] = useState(false);
  let userCollection = {};
    if(uid !== ""){
      userCollection = dbCollection.doc(uid).collection('tasks');
    }
  useEffect(() => {
      if(login !== true){
        userAuthentication({uid, setUid, setLogin});
      }
      if (login === true && list.length === 0) {
        getData({userCollection, saveNewList});

      if(loading === true){
        getData({userCollection, saveNewList});
        setLoading(false);
      }
      }
    }, [login, loading ]); // eslint-disable-line


  function buttonDisable(arr){
    const newList =  arr.filter(item => item.done);
    return newList.length;
  };
  let buttonON = Boolean(buttonDisable(list));

  function saveNewList({list, obj, id, change, userCollection}){
    const newList = contextObject.saveList({list, obj, id, change, userCollection});
    setList(newList);
  };

  function removeItemByStatus() {
    const newList = contextObject.removeByStatus(list, userCollection);
    setList(newList);
  };

  function deleteItem(id) {
    const newList = contextObject.removeItem(id, list, userCollection);
    setList(newList);
  };

  function switchStatus(id) {
    const newList = contextObject.changeStatus(id, list, userCollection);
    setList(newList);
  };

  function switchSide(id) {
    const newList = contextObject.changeSide(id, list);
    setList(newList);
  };

  function newTask(title, day){
    contextObject.addTask(title, day, list, userCollection);
    setLoading(true);
  };

  function saveChanges(id, editForm, setEditForm){
    contextObject.save(id, editForm, setEditForm, userCollection);
  };

  function logoutUser() {
    logOut()
      .then(() => setLogin(false))
      .catch(console.log)
  };


    return(
      <Context.Provider value={{removeItemByStatus, deleteItem, switchStatus, switchSide, saveChanges}}>
        <div className="App">
          {login ? (
            <Layout>
              <Layout.Header className="App-header">
                <Clock format={'dddd, MMMM Mo, YYYY, HH:mm:ss'} ticking={true} className="clock"  />
                <AppControl addTask={newTask} buttonON={buttonON} />
                <Button type="primary" icon="logout" className="position" onClick={logoutUser}>Wyloguj</Button>
              </Layout.Header>
                <Layout.Content className="flex">
                  <Lists list={contextObject.selectDay("today", list)} saveList={saveNewList} day="today"/>
                  <Lists list={contextObject.selectDay("tomorrow", list)} saveList={saveNewList} day="tomorrow"/>
                </Layout.Content>
            </Layout>
           ) : (
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
              )}
        </div>
      </Context.Provider>
    )
}

export {Context};
export default App;

