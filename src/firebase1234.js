import React, {useContext, useState, useEffect} from 'react';
import './App.css';
import AppControl from './components/AppControl';
import Lists from './components/Lists';
// import firebase from './config/fireBaseConfig';
// import {Context, Fncontext} from './components/context'




const Context = React.createContext([]);
// let db = firebase.firestore();
// let doc = db.collection('tasks');

function App(){
  const newContext = useContext(Context);
  let [list, setList] = useState(newContext);
  // let [loading, setLoading] = useState(false);

  // function getData(){
  //   setLoading(true);
  //   console.log('yrdy');
  //   db.collection('tasks').get().then(function(snapshot) {
  //     console.log(loading);
  //     const data = snapshot.docs;
  //       const newArr = data.map(doc => {
  //         return {...doc.data(), id: doc.id}
  //       });
  //       setList(newArr);
  //       setLoading(false);
  //   })
  // };
  // console.log(loading);

  // // shoudComponentUpdate() {
  // //   return list.length > 0;
  // // };

  // function onSnapshot() {
  //   doc.onSnapshot(docSnapshot => {
  //     getData();

  //   }, err => {
  //     console.log(`Encountered error: ${err}`);
  //   });
  // }

  // // useEffect( onSnapshot, [])

  //   useEffect(() => {
  //     if (list.length <= 0) {
  //       onSnapshot();
  //     }
  //   });

  // function removeData(id) {
  //   let removeDBitem = db.collection('tasks').doc(id)
  //   removeDBitem.delete();
  // };

  function addTask(title, day){
    const obj = {title, day, done: false, id: Math.random() * 1000 }
    // db.collection('tasks').add(obj);
    const newArr = [...list, obj];
    setList(newArr);
    // getData();
  };

  function selectDay(day) {
    const newArr = list.filter(item => item.day === day);
    return newArr;
  };

  function removeByStatus() {
    const newArr = list.filter((item) => item.done !==true);
    // {
    //   if(item.done === true){
    //     removeData(item.id);
    //   }
    //   return false
    // })
    setList(newArr);
  };

  const contextObject = {
    removeItem(id) {
      const newArr = list.filter(item => item.id !== id);
      setList(newArr)
      // removeData(id);
    },

    changeStatus(id) {
      const newArr = list.map((item) => {
        if(item.id === id) {
          return {...item, 'done': !item.done}
        }
        return item;
      })

      // {
      //   if(item.id === id) {
      //       let DBitem = db.collection('tasks').doc(id);
      //       DBitem.update({'done': !item.done})
      //       {'done': !item.done};

      //   }
      //   return item
      // });
      setList(newArr);
      // getData();
    },

    changeSide(id) {
     const newArr = list.map((item) => {
       if(item.id === id) {
        return item.day === "today" ? {...item, 'day': "tomorrow"} : {...item, 'day': "today"}
       }
       return item;
     });

      //   if(item.id === id) {
      //     // let DBitem = db.collection('tasks').doc(id);

      //     // return item.day === "today" ? DBitem.update({'day': "tomorrow"}) : DBitem.update({'day': "today"})
      //     return item.day === "today" ? {'day': "tomorrow"} : {'day': "today"}
      //   }
      //   return item;
      // });
      setList(newArr)
      // getData();
    }
  };

    return(
      <Context.Provider value={contextObject}>
        <div className="App">
          <header className="App-header"><h1>To Do Lista</h1>
            <AppControl addTask={addTask} removeByStatus={removeByStatus} />
          </header>
            <Lists list={selectDay("today")} day="today"/>
            <Lists list={selectDay("tomorrow")} day="tomorrow"/>
        </div>
      </Context.Provider>
    )
}

export {Context};
export default App;

