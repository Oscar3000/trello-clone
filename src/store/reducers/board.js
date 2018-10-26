import * as actionTypes from '../actions/actionTypes';

const initialState = {
  boards:[],
  error:null,
  loading:false,
  currentBoard:null,
  item:null
}

const getBoards =(state,action) =>{
  let boards = action.boards;
  if(boards === null){
    boards =[];
  }
  return {...state,boards:boards}
}

const addBoard = (state,action) => {
  let boards = [...state.boards];
  boards.push(action.board);
  localStorage.setItem('boards',JSON.stringify(boards)); 
  return {...state,boards:boards}
}

const removeBoard = (state,action) => {
  let boards = [...state.boards];
  boards = boards.filter(board => board.id !== action.id);
  localStorage.setItem('boards',JSON.stringify(boards)); 
  return { ...state, boards:boards };
}

const getBoard = (state,action) =>{
  let currentBoard = state.boards.filter(board => board.id === action.id);
  return {...state,currentBoard:currentBoard[0],loading:false};
}

const addList = (state,action) =>{
  let board = state.boards.filter(board=>board.id === action.boardId);
  board[0].lists.push(action.list);
  board = board[0];
  const newBoards = state.boards.map(Board=>{
    if(Board.id === action.boardId){
      Board = board;
    }
    return Board;
  });
  localStorage.setItem('boards',JSON.stringify(newBoards)); 
  return {...state,boards:newBoards};
};

const removeList = (state,action) =>{
  const boards = [...state.boards];
  const board = boards.filter(board=>board.id === action.boardId);
  let newLists = board[0].lists.filter(list=>list.id !== action.id);
  //console.log(newLists);
  const newBoards = state.boards.map(Board=>{
    if(Board.id === action.boardId){
      Board.lists = newLists;
    }
    return Board;
  });
  localStorage.setItem('boards',JSON.stringify(newBoards)); 
  return {...state,boards:newBoards,error:null};
}

const addItem = (state,action) =>{
  let newList = state.boards.filter(board=>board.id === action.boardId)[0].lists.filter(list=>list.id === action.listId);
  newList[0].items.push(action.item);
  newList = newList[0];
  const newBoards = state.boards.map(board=>{
    if(board.id === action.boardId){
      board.lists = board.lists.map(list =>{
        if(list.id === action.listId){
          list = newList;
        }
        return list;
      });
    }
    return board;
  });
  localStorage.setItem('boards',JSON.stringify(newBoards)); 
  return {...state,boards:newBoards};
}

const removeItem = (state,action) =>{
  let newList = state.boards.filter(board=>board.id === action.boardId)[0].lists.filter(list=>list.id === action.listId)[0];
  newList.items = newList.items.filter(item=>item.id !== action.id);
  const newBoards = state.boards.map(board=>{
    if(board.id === action.boardId){
      board.lists = board.lists.map(list =>{
        if(list.id === action.listId){
          list = newList;
        }
        return list;
      });
    }
    return board;
  });
  localStorage.setItem('boards',JSON.stringify(newBoards)); 
  return {...state,boards:newBoards};
}

const getItem = (state,action) =>{
  const item = state.boards.filter(board=>board.id === action.boardId)[0].lists.filter(list=>list.id === action.listId)[0].items.filter(item=>item.id === action.id)[0];
  return {...state,item:item};
}

const itemDone =(state,action) =>{
  const editedItem = state.boards.filter(board=>board.id === action.boardId)[0].lists.filter(list=>list.id === action.listId)[0].items.filter(item=>item.id === action.id)[0];
  editedItem.isDone = true;
  const newBoards = state.boards.map(board=>{
    if(board.id === action.boardId){
      board.lists = board.lists.map(list=>{
        if(list.id === action.listId){
          list.items = list.items.map(item=>{
            if(item.id === action.id){
              item = editedItem;
            }
            return item;
          });
        }
        return list;
      });
    }
    return board;
  });
  localStorage.setItem('boards',JSON.stringify(newBoards)); 
  return {...state,boards:newBoards};
}

const reducer = (state=initialState,action) =>{

  switch(action.type){
      case actionTypes.GET_BOARDS:
        return getBoards(state,action);
      case actionTypes.ADD_BOARD:
        return addBoard(state,action);
      case actionTypes.REMOVE_BOARD:
        return removeBoard(state,action);
      case actionTypes.GET_BOARD:
        return getBoard(state,action);
      case actionTypes.ADD_LIST:
        return addList(state,action);
      case actionTypes.REMOVE_LIST:
        return removeList(state,action);
      case actionTypes.ADD_ITEM:
        return addItem(state,action);
      case actionTypes.REMOVE_ITEM:
        return removeItem(state,action);
      case actionTypes.GET_ITEM:
        return getItem(state,action);
      case actionTypes.ITEM_DONE:
        return itemDone(state,action);
      case actionTypes.START_GET_BOARD:
        return {...state,loading:true};
    default:
      return state;
  }
  
}

export default reducer;