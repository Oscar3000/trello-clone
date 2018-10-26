import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import Input from '../Components/Input';
import uuidv4 from 'uuid/v4';
import List from '../Components/List';

class Board extends Component {

  state = {
    show:false,
    name:'',
    err:false,
    PrevListId:null,
  };

  componentDidMount(){
    this.props.getBoards();
    this.props.getBoard(this.props.match.params.id);
  }

  InputHandler =(e)=>{
    if(e.target.value.trim() === ''){
      this.setState({err:true,name:''});
    }else{
      this.setState({name:e.target.value.trim(),err:false});
    }
  }
   
  openInput =()=>{
    this.setState({show:true});
  }

  
  createListHandler = (e) =>{
    if(e.charCode===13){
      if(this.state.name === '' || this.state.err){
        this.setState({err:true,name:''});
      }else{
        this.props.addList({name:this.state.name,id:uuidv4(),items:[]},this.props.board.id);
        setTimeout(()=>{
          this.setState({show:false,name:''});
          },0);
      }
    }
  }

  removeListHandler = (id,boardId)=>{
    this.props.removeList(id,boardId);
    setTimeout(()=>{
      this.setState({show:true});
      },0);
  }

  addItemHandler = (e,boardId,listId) =>{
    if(e.charCode===13){
      if(this.state.name === '' || this.state.err){
        this.setState({err:true,name:''});
      }else{
        this.props.addItem({ name: this.state.name, id: uuidv4(), isDone: false },boardId,listId);
        e.target.value = '';
        setTimeout(()=>{
          this.setState({name:''});
          },0);
      }
    }
  }

  dragStartHandler = (e,itemId,listId) =>{
    console.log("Drag Start");
    this.props.getItem(itemId,listId,this.props.board.id);
    this.setState({PrevListId:listId});
  }

  dragEndHandler = (e,itemId,listId,boardId) =>{
    console.log("Drag End");
  }

  dragOverHandler = (e) =>{
     //console.log("Drag Over");
     e.preventDefault();
    // console.log(e.target);
  }

  dragEnterHandler =(e) =>{
     e.preventDefault();
     console.log("Drag Enter");
    // e.target.classList.add('hovered');
  }

  dragLeaveHandler = (e) => {
    console.log("Drag Leave");
  }

  dropHandler = (e,listId) =>{
    console.log("Drop");
    this.props.removeItem(this.props.item.id,this.state.PrevListId,this.props.board.id);
    this.props.item.isDone = false;
    this.props.addItem(this.props.item,this.props.board.id,listId);
    this.setState({PrevListId:null});
  }

  itemDoneHandler = (itemId,listId,boardId) =>{
    this.props.itemDone(itemId,listId,this.props.board.id);
    this.setState({name:''});
  }

  render() {
    let board = null,lists=null;
    if(this.props.board){
      board = (
        <div className ="board p-5 m-2" style={{backgroundColor:'#03db15',color:'white'}}>
            {this.props.board.name}
          </div>
      );
      lists = this.props.board.lists.map(list=>{
        return (
            <List {...list} key={list.id} boardId={this.props.board.id} removeList={this.removeListHandler} addItem={this.addItemHandler} err={this.state.err} Input={this.InputHandler} dragStart={this.dragStartHandler}
            dragEnd={this.dragEndHandler} dragOver ={this.dragOverHandler} dragEnter={this.dragEnterHandler} dragLeave={this.dragLeaveHandler} drop={this.dropHandler} itemDone = {this.itemDoneHandler}/>
        )
      });
    }


    let addList = null;
    if(this.state.show){
        addList = (
          <div className="p-2 m-2 list">
            <Input placeholder="Add a list" error ={this.state.err} create={this.createListHandler} InputHandler={this.InputHandler} id="list" />
          </div>
        );
    }
    if(this.props.loading){
      lists = <p>Loading....</p>;
    }
    return (
      <div id="boardList">
        {board}
        <br />
        <div className="d-flex flex-wrap align-items-start">
        {lists}
        {addList}
        <div className="addList ml-3 p-4 my-2" onClick={this.openInput}>
          Add List
        </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  board:state.currentBoard,
  loading:state.loading,
  item:state.item
});

const mapDispatchToProps = dispatch => {
  return{
    getBoards:() => dispatch(actions.getBoards()),
    getBoard:(id) => dispatch(actions.getBoard(id)),
    addList:(list,boardId) => dispatch(actions.addList(list,boardId)),
    removeList:(id,boardId) => dispatch(actions.removeList(id,boardId)),
    addItem:(item,boardId,listId) => dispatch(actions.addItem(item,boardId,listId)),
    getItem:(id,listId,boardId) => dispatch(actions.getItem(id,listId,boardId)),
    removeItem:(id,listId,boardId) => dispatch(actions.removeItem(id,listId,boardId)),
    itemDone:(id,listId,boardId) => dispatch(actions.itemDone(id,listId,boardId))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Board);
