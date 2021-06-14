import React, {Component} from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, 
    Col, Label, Modal, ModalHeader,ModalBody} from "reactstrap";
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;
class CommentForm extends Component{
    constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
  }

  render() {
    return (
    <div>
    <Button outline onClick={this.toggleModal}>
        <span className= "fa fa-pencil"></span> Submit Comment
    </Button>
    <Modal isOpen = {this.state.isModalOpen} toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal} >Submit Comment</ModalHeader>
        <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                
                <Col md={10}>
                <Label htmlFor="rating" >Rating</Label>
                    <Control.select model=".contactType" name="contactType"
                        className="form-control">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Control.select>
                </Col>
                <Col md={10}>
                <Label htmlFor="author" >Your Name</Label>
                    <Control.text model=".author" id="author" name="author"
                        placeholder="author"
                        className="form-control"
                        validators={{
                            required, minLength: minLength(3), maxLength: maxLength(15)
                        }}
                            />
                        <Errors
                        className="text-danger"
                        model=".author"
                        show="touched"
                        messages={{
                            required: 'Required',
                            minLength: 'Must be greater than 2 characters',
                            maxLength: 'Must be 15 characters or less'
                        }}/>
                </Col>
                
                <Col md={10} >
                <Label htmlFor="comment" >Comment</Label>
                    <Control.textarea model=".comment" id="comment" name="comment"
                        rows="6"
                        className="form-control m-1" />
                </Col>
                <Col md={10}>
                    <Button type="submit" color="primary">
                    Submit
                    </Button>
                </Col>
            </LocalForm>
        </ModalBody>
    </Modal>
    </div>
    );
  }
}
function RenderDish({dish}) {

            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width="50%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle> {dish.name}</CardTitle>
                            <CardText> {dish.description} </CardText>
                        </CardBody>
                    </Card>
                </div>   
            );
    }

  function  RenderComments({comments}){
        if (comments != null) {
            return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {comments.map(comment => {
                    return (
                        <li key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author},
                            &nbsp;
                            {new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit'
                            }).format(new Date(comment.date))}
                            </p>
                        </li>
                    );
                    })}
                </ul>
                <CommentForm/>
            </div>
            );
        }
       else {
           return (
            <div></div>
           );
       }
    }


    const DishDetail = (props) =>{
        if(props.dish != null){
            return (
                <div className= "container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active> {props.dish.name}
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className ="row">
                        <RenderDish dish = {props.dish}/>
                        <RenderComments comments = {props.comments}/>                     
                    </div>
                </div>
            );
        }
        else {
            return (<div></div>);
        }
           
    }



export default DishDetail;