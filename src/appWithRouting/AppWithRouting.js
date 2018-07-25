import React from "react";
import {Switch, Route, Link} from 'react-router-dom'

const AppWithRouting = (props) => {
    const computers = [{id: 1, name: 'Mac Book Pro'}, {id: 2, name: 'Dell Inspiron'}];
    const findComputer = id => (computers.find(computer => computer.id === id));

    return (
        <main>
            <h1>Application with Routing</h1>
            <Switch>
                <Route exact path='/' render={(props) => (<ComputersListing computers={computers}/>)}/>
                <Route path='/computer/:computerId' render={(props) => {
                    let computer = findComputer(parseInt(props.match.params.computerId));
                    return (<Computer {...computer}/>);}} />
            </Switch>
        </main>
    )
};

const ComputersListing = (props) => {
    return (
        <div>
            <h2>Computers</h2>
            {props.computers.map((computer) => (
                <div key={computer.id}>{computer.name} <Link to={`/computer/${computer.id}`}>View</Link></div>
            ))}

        </div>
    );
};

const Computer = (props) => {
    return (
        <div>
            <h2>{props.name}</h2>
            <p>ID: {props.id}</p>
            <Link to="/">Back</Link>
        </div>
    );
};

export default AppWithRouting;
