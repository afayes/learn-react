import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import React from 'react'
import {Route, Switch} from "react-router-dom";
import {deleteComputer, saveComputer} from "../actions";
import {ComputersListing, ComputerAddOrEdit} from "../components/components"

export const ComputerApp = (props) => {
    const findComputer = id => (props.computers.find(computer => computer.id === id));
    return (
        <div>
            <h1>Computer Application v1.0</h1>
            <Switch>
                <Route exact path='/' render={() => (<ComputersListing handleDeleteComputer={props.handleDeleteComputer} computers={props.computers}/>)}/>
                <Route exact path='/computer/add'
                       render={() => <ComputerAddOrEdit handleSaveComputer={props.handleSaveComputer}/>}/>
                <Route exact path='/computer/:computerId' render={(routeProps) => {
                    let computer = findComputer(parseInt(routeProps.match.params.computerId));
                    return (<ComputerAddOrEdit {...computer} handleSaveComputer={props.handleSaveComputer}/>);
                }}/>

            </Switch>
        </div>
    );
};

const mapStateToProps = state => ({
    computers: state.computers
});

const mapDispatchToProps = dispatch => ({

    handleSaveComputer: (computer) => {
        dispatch(saveComputer(computer))
    },

    handleDeleteComputer: (computerId) => {
        dispatch(deleteComputer(computerId))
    }
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps)((ComputerApp)));