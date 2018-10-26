import * as actionTypes from './actionTypes';



export const getBoards = ()=>{
  const boards = JSON.parse(localStorage.getItem('boards'));
  return {
    type:actionTypes.GET_BOARDS,
    boards
  }
}

export const addBoard = (board) =>{
  return {
    type:actionTypes.ADD_BOARD,
    board
  };
};

export const removeBoard = (id) =>{
  return {
    type:actionTypes.REMOVE_BOARD,
    id
  };
};

export const startGetBoard = () =>{
  return {
    type:actionTypes.START_GET_BOARD
  }
}

export const getBoard = (id) =>{
  return{
    type:actionTypes.GET_BOARD,
    id
  };
};


export const addList = (list, boardId) =>{
  return {
    type:actionTypes.ADD_LIST,
    list,
    boardId
  };
};

export const removeList = (id, boardId) =>{
  return{
    type:actionTypes.REMOVE_LIST,
    id,
    boardId
  };
};

export const getList = (id,boardId) =>{
  return{
    type:actionTypes.GET_LIST,
    id,
    boardId
  };
};

export const addItem = (item,boardId,listId) =>{
  return {
    type:actionTypes.ADD_ITEM,
    item,
    boardId,
    listId
  };
};


export const removeItem = (id,listId,boardId) =>{
  return {
    type:actionTypes.REMOVE_ITEM,
    id,
    boardId,
    listId
  };
};


export const getItem = (id,listId,boardId) =>{
  return {
    type:actionTypes.GET_ITEM,
    id,
    boardId,
    listId
  };
};

export const itemDone = (id,listId,boardId) =>{
  return {
    type:actionTypes.ITEM_DONE,
    id,
    boardId,
    listId
  };
};
