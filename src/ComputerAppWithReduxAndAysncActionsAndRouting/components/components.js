import React, {Component} from 'react'
import {Link, Route, Switch} from "react-router-dom";


export class ComputersListing extends Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);

    }

    render() {
        return (
            <Route render={({history}) => (
            <div>
                <h2>Computers <Link to="/computer/add">Add</Link></h2>
                {this.props.computers.map(computer => <p key={computer.id}>{computer.name}
                <nbsp/> <Link to={`/computer/${computer.id}`}>Edit</Link>
                <nbsp/> <a href="" onClick={(event) => this.handleDelete(event, computer.id, history)}>Delete</a>
                </p>)}
            </div>
            )}/>
        );
    }

    handleDelete(event, computerId, history) {
        event.preventDefault();
        this.props.handleDeleteComputer(this.state).then(() => {
            history.push("/")
        })
    }
}


export class ComputerAddOrEdit extends Component {
    constructor(props) {
        super(props);
        if (typeof props.id !== 'undefined') {
            this.state = {...props};
        } else {
            this.state = {
                name: ""
            };
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;

        this.setState({
            [target.name]: target.value
        });
    }

    handleSubmit(event, history) {
        event.preventDefault();
        this.props.handleSaveComputer(this.state).then(() => {
            history.push("/")
        })
    }

    render() {
        return (
            <Route render={({history}) => {
                return (
                    <div>
                        <h3>{this.props.id ? 'Edit ' + this.state.name : 'Create ' + this.state.name}</h3>
                        <form onSubmit={(event) => this.handleSubmit(event, history)}>
                            <div>
                                <label>
                                    Name:
                                    <input name="name" type="text" value={this.state.name}
                                           onChange={this.handleChange}/>
                                </label>
                            </div>

                            <input type="submit" value="Submit"/>
                        </form>
                    </div>
                )
            }}/>
        );
    }
}

