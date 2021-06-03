import React, {Component} from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments';
import {PROMOTIONS} from '../shared/promotions';
import {LEADERS} from '../shared/leaders';
import {Switch, Route, Redirect} from 'react-router-dom';


class Main extends Component{

  constructor (props){
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
   //   selectedDish: null
    };
  }
  
 /* onDishSelect(dishId) {
    this.setState({selectedDish: dishId}); 
}*/
  render(){
    const HomePage = () =>{
      return (
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.state.promotions.filter((promotion) => promotion.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        ></Home>
      );
    }
    return (
      <div >
        <Header/>
        <Switch>
          <Route path="/home" component={HomePage}></Route>
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes}/>}></Route>
          <Route exact path="/contactus" component={Contact}></Route>
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
export default Main;