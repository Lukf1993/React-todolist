const contextObject = {

   saveList({list, obj, id, change, userCollection} ) {
    if(obj !== undefined) {
      userCollection.add(obj);
    }

    if(id !== undefined) {
      let DBitem = userCollection.doc(`${id}`);
      DBitem.update(change);
    }
    if(list !== undefined) {
      const newList = list
      return newList
    }
  },

   save(id, editForm, setEditForm, userCollection) {
    setEditForm(state => ({
      ...state,
      editing: false
    }))
    let change = {'title': editForm.newText}
    contextObject.saveList({id: id, change: change, userCollection })
  },

  addTask(title, day, list, userCollection){
    if(title === ''){
      alert('Trzeba coś wpisać :P')
    } else {
    const obj = {title, day, done: false  }
    const newArr = [...list, obj];

    contextObject.saveList({list: newArr, obj: obj, userCollection});
    return newArr;
    }
  },

  selectDay(day, arr) {
    const newArr = arr.filter(item => item.day === day);
    return newArr;
  },

  removeData(id, userCollection) {
      let removeDBitem = userCollection.doc(id)
      removeDBitem.delete();
    },

  removeByStatus(arr, userCollection) {
    const newArr = arr.filter((item) => {
      if(item.done === true){
        contextObject.removeData(item.id, userCollection);
      }
      return item.done !== true
    });
    this.saveList({list: newArr});
    return newArr;
  },

  removeItem(id, arr, userCollection) {
    const newArr = arr.filter(item => item.id !== id);
    contextObject.removeData(id, userCollection);
    this.saveList({list: newArr});
    return newArr
  },

  changeStatus(id, arr, userCollection) {
    let change = null;
    const newArr = arr.map((item) => {
      if(item.id === id) {
        change = {'done': !item.done}
        return {...item, 'done': !item.done}
      }
      return item;
    })
    this.saveList({list: newArr, id: id, change:change, userCollection})
    return newArr
  },

  changeSide(id, arr) {
    let change = null;
    const newArr = arr.map((item) => {
      if(item.id === id) {
          if(item.day === "today"){
            change = {'day': "tomorrow"}
            return {...item, 'day': "tomorrow"}
          } else{
              change = {'day': "today"}
              return {...item, 'day': "today"}
            }
      }
     return item;
     });
    this.saveList({list: newArr, change: change})
    return newArr
  }
};

export {contextObject};
