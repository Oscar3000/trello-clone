import React, { Component } from 'react';
import Item from './Item';
import Input from './Input';

class List extends Component {

  onDeleteListHandler = (e) =>{
    this.props.removeList(this.props.id,this.props.boardId);
  }

  createItem = (e) => {
    this.props.addItem(e,this.props.boardId, this.props.id);
  }

  InputHandler = (e) =>{
    this.props.Input(e);
  }

  dragStart =(e,id,listId) =>{
    this.props.dragStart(e,id,listId);
  }

  dragEnd = (e,id,listId,boardId)=> {
    this.props.dragEnd(e,id,listId,boardId);
  }

  itemDone = (itemId,listId) =>{
    this.props.itemDone(itemId,listId);
  }
  render() {
    let items = null;
    if(this.props.items){
      items = this.props.items.map(item =>{
        return (
          <Item {...item} key ={item.id} boardId={this.props.boardId} listId={this.props.id} dragStart={(e)=>this.dragStart(e,item.id,this.props.id)} dragEnd={(e) => this.dragEnd(e,item.id,this.props.id,this.props.boardId)} itemDone = {()=> this.itemDone(item.id,this.props.id)}/>
        )
      })
    }
    return (
      <div className="p-4 m-2 list">
        <p className="text-center">{this.props.name}</p>
        <hr />
        <Input placeholder="Add an item" error={this.props.err} create={this.createItem} InputHandler={this.InputHandler} id="item" />
        <div className="addItem" onDragOver={this.props.dragOver} onDragEnter={this.props.dragEnter} onDragLeave={this.props.dragLeave} onDrop={(e)=>this.props.drop(e,this.props.id)} id={this.props.id}>
          {items}
        </div>
        <hr />
        <button className="btn btn-outline-danger" onClick={this.onDeleteListHandler}>Delete</button>
      </div>
    );
  }
}

export default List;