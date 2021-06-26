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
import {addComment, fetchDishes} from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => dispatch (addComment(dishId, rating, author, comment)),
  fetchDishes: () =>{dispatch(fetchDishes())}
});

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
}
  render(){
    const HomePage = () =>{
      return (
        <Home 
              //dish={this.props.dishes.filter((dish) => dish.featured)[0]} // replave for thunk implementation
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading = {this.props.dishes.isLoading}
              dishesErrMess = {this.props.dishes.errMess}
              promotion={this.props.promotions.filter((promotion) => promotion.featured)[0]}
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
          comments = {this.props.comments.filter((comments)=> comments.dishId === parseInt(match.params.dishId,10))}
          addComment = {this.props.addComment}
        />
       );
    }
    return (
      <div >
        <Header/>
        <Switch>
          <Route path="/home" component={HomePage}></Route>
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}></Route>
          <Route path = "/menu/:dishId" component={DishWithId}></Route>
          <Route exact path="/contactus" component={Contact}></Route>
          <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>}></Route>
          <Redirect to="/home"></Redirect>
        </Switch>
       { /*<Menu dishes = {this.state.dishes}
          onClick = {(dishId) => this.onDishSelect(dishId)}/>
        <Dishdetail dish = { this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}></Dishdetail>*/}
        <Footer/>
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));