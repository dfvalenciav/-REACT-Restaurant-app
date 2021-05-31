import React, {Component} from 'react';
import {Navbar, NavbarBrand, Jumbotron} from 'reactstrap';


class Header extends Component {
    render (){
        return(
            <>{/*<> if it does not work use React.Fragment inside on it
            </> is an abrevation from React.Fragment*/}            
            <Navbar dark >
                <div className="container">
                    <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
                </div>
            </Navbar>
            <Jumbotron >
            <div className="container">
                <div className ="row row-header">
                    <div className="col-12 col-sm-6">
                        <h1>Ristorante Con Fusion</h1>
                        <p>We take inspiration from the Wolrd's best cuisines, and create a unique experince. Our lipsmacking creations will tickle your culinary senses!</p>
                    </div>
                </div>
            </div>    
            </Jumbotron>
            </>
        );
    }
}

export default Header;
/*
<>
</> is an abrevation from React.Fragment

*/