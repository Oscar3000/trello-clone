import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import * as actions from '../store/actions/index';

class BoardBuilder extends Component {
  state ={
    show:false,
    err:false,
    name:''
  }

  componentDidMount(){
    this.props.getBoards();
  }
  
  openBuilderHandler = (e)=>{
    this.setState({show:true});
  }


  closeBuilderHandler = (e)=>{
    setTimeout(()=>{
    this.setState({show:false});
    },0);
  }

  createBoard = (e) =>{
    if(this.state.name === '' || this.state.err){
      this.setState({err:true,name:''});
    }else{
      this.props.addBoard({name:this.state.name,id: uuidv4(),lists:[]});
      setTimeout(()=>{
        this.setState({show:false});
        },0);
    }
  }

  InputHandler = (e) =>{
    if(e.target.value.trim() === ''){
      this.setState({err:true});
    }else{
      this.setState({name:e.target.value.trim(),err:false});
    }
  }
  render() {
    let box = null, close =null,boards=null;
    if(this.state.show){
      box = (<div className="mt-2">
        <hr />
        <div className="form-group">
          <label htmlFor="name">What shall we call this board?</label>
          <input type="text" name="name" className="form-control" id="boardName"  onChange={this.InputHandler}/>
          { this.state.err ? <span className="text-danger">The Name is required</span>:null}
        </div>
        <div className="d-flex justify-content-between">
          <button className="cancelCreateBtn btn" onClick={this.closeBuilderHandler}>Cancel</button>
          <button className="createBtn btn" onClick={this.createBoard}>Create</button>
        </div>
      </div>);
      close = <button className="iconBtn"  onClick={this.closeBuilderHandler}><i className="fas fa-times"></i></button>;
    }
    if(this.props.boards.length>0){
      boards = this.props.boards.map(board =>{
        return (
          <Link to={"b/"+board.id} key={board.id}>
          <div className ="board p-5 mx-2">
            {board.name}
          </div>
          </Link>
        )
      })
    }


    return (
      <div className="d-flex flex-wrap align-items-start">
        <div className="boardCreator p-5 m-2" onClick={this.openBuilderHandler}>
          <div className="d-flex justify-content-between aligns-items-center">
            <p> Create new Board </p>
            {close}
          </div>
          {box}
        </div>
        {boards}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  boards:state.boards
})

const mapDispatchToProps = dispatch => {
  return{
    getBoards:() => dispatch(actions.getBoards()),
    addBoard:(board) => dispatch(actions.addBoard(board)),
    removeBoard:(id) => dispatch(actions.removeBoard(id)) 
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(BoardBuilder);
