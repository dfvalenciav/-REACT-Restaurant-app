import React, {Component} from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {DISHES} from '../shared/dishes';
import {Switch, Route, Redirect} from 'react-router-dom';


class Main extends Component{

  constructor (props){
    super(props);

    this.state = {
      dishes: DISHES,
   //   selectedDish: null
    };
  }
  
 /* onDishSelect(dishId) {
    this.setState({selectedDish: dishId}); 
}*/
  render(){
    const HomePage = () =>{
      return (
        <Home></Home>
      );
    }
    return (
      <div >
        <Header/>
        <Switch>
          <Route path="/home" component={HomePage}></Route>
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes}/>}></Route>
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