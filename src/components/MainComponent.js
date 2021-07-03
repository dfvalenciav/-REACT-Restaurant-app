import React, {Component} from 'react';
import Home from './HomeComponent';
import About from './AboutComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import DishDetail from './DishdetailComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {postComment, fetchComments, fetchDishes, fetchPromos} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch (postComment(dishId, rating, author, comment)),
  fetchDishes: () =>{dispatch(fetchDishes())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  fetchComments: () =>{dispatch(fetchComments())},
  fetchPromos: () =>{dispatch(fetchPromos())}
}
);

class Main extends Component{

 /* constructor (props){
    super(props);

    this.state = { It is replace by redux

   //   selectedDish: null
    };
  }*/
  
 /* onDishSelect(dishId) {
    this.setState({selectedDish: dishId}); 
}*/

componentDidMount(){
  this.props.fetchDishes();
  this.props.fetchComments();
  this.props.fetchPromos();
}
  render(){
    const HomePage = () =>{
      return (
        <Home 
              //dish={this.props.dishes.filter((dish) => dish.featured)[0]} // replave for thunk implementation
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading = {this.props.dishes.isLoading}
              dishesErrMess = {this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
              promosLoading = {this.props.promotions.isLoading}
              promosErrMess = {this.props.promotions.errMess}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        ></Home>
      );
    }

    const DishWithId = ({match}) =>{
       return (
        <DishDetail 
          //dish = {this.props.dishes.filter ((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          dish = {this.props.dishes.dishes.filter ((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          isLoading = {this.props.dishes.isLoading}
          errMess = {this.props.dishes.errMess}
          comments = {this.props.comments.comments.filter((comments)=> comments.dishId === parseInt(match.params.dishId,10))}
          commentsErrMess = {this.props.comments.errMess}
          postComment = {this.props.postComment}
        />
       );
    }
    return (
      <div >
        <Header/>
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={1000}>
            <Switch>
              <Route path="/home" component={HomePage}></Route>
              <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}></Route>
              <Route path = "/menu/:dishId" component={DishWithId}></Route>
              <Route exact path="/contactus" component={() => <Contact resetFeedbackForm = {this.props.resetFeedbackForm}/>}></Route>
              <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>}></Route>
              <Redirect to="/home"></Redirect>
            </Switch>
            </CSSTransition>
        </TransitionGroup>
       { /*<Menu dishes = {this.state.dishes}
          onClick = {(dishId) => this.onDishSelect(dishId)}/>
        <Dishdetail dish = { this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}></Dishdetail>*/}
        <Footer/>
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));