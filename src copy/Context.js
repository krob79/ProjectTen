import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';
import { Link, useHistory } from "react-router-dom";

const Context = React.createContext();

export class Provider extends Component {
    state = {
        authenticatedUser: null
    };

    constructor(){
        super();
        this.data = new Data();

        this.cookie = Cookies.get('authenticatedUser');

        this.state = {
            authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null
        }
    }

    render() {
        const { authenticatedUser } = this.state;
        const value = {
            authenticatedUser,
            data: this.data,
            actions:{//give the Provider an 'actions' property/object to store event handlers or actions you want to perform on data
                signIn: this.signIn,
                signOut: this.signOut
            }
        }

        return (
            <Context.Provider value={value}>
              {this.props.children}
            </Context.Provider>  
        );
    }

    signIn = async (username, password) => {
        const user = await this.data.getUser(username, password);
        if(user !== null){
          this.setState(() => {
            return {
              authenticatedUser: user,
            };
          });
          //set cookie name, cookie value, other options
          Cookies.set('authenticatedUser', JSON.stringify(user), {expires:1});
        }
        return user;
    }
    
    signOut = () => {
        this.setState(() => { 
          return {
            authenticatedUser: null,
          };
        });
        Cookies.remove('authenticatedUser');
    }

}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
    return function ContextComponent(props) {
      return (
        <Context.Consumer>
          {context => <Component {...props} context={context} />}
        </Context.Consumer>
      );
    }
}


