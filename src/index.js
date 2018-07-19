import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ComputerDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            computers: [
                {name: 'Mac Book Pro', model: 'Early 2018', id:1},
                {name: 'Dell', model: 'Inspiron', id:2}],
            addingComputer: false,
            editingComputerId: null
        };

        this.handleShowAddComputer = this.handleShowAddComputer.bind(this);
        this.handleShowEditComputer = this.handleShowEditComputer.bind(this);
        this.handleSaveComputer = this.handleSaveComputer.bind(this);
    }

    render() {
        let component;

        if (this.state.editingComputerId) {
            component =  <ComputerAddOrEdit handleSaveComputer={this.handleSaveComputer} computerToEdit={this.findComputer(this.state.editingComputerId)}/>
        } else if (this.state.addingComputer === false) {
            component =
            <div>
                <h2>Computers <button onClick={this.handleShowAddComputer}>Add</button></h2>
                 <ComputerListing computers={this.state.computers} handleShowEditComputer={this.handleShowEditComputer}/>
            </div>
        } else {
            component = <ComputerAddOrEdit handleSaveComputer={this.handleSaveComputer}/>
        }

        return (
            <div>
                <h1>Computer Application 1.0</h1>
                {component}
            </div>
        );
    }

    handleShowAddComputer() {
        this.setState({
            addingComputer: true
        });
    }

    handleShowEditComputer(computerId) {
        this.setState({
            editingComputerId: computerId
        });
    }

    handleSaveComputer(computer) {
        if (computer.id) {
            this.handleEditComputer(computer);
        } else {
            this.handleAddComputer(computer);
        }
    }

    handleAddComputer(computer) {
        this.setState((prevState) => {
            computer.id = Math.floor(Math.random() * 999999999) + 1; // todo improve random id generation
            let comps = prevState.computers.slice();
            comps.push(computer);
            return ({
                computers: comps,
                addingComputer: false
            })
        });
    }

    handleEditComputer(computer) {
        for (let i = 0; i < this.state.computers.length; i++) {
            if (this.state.computers[i].id === computer.id) {
                this.state.computers[i] = computer;
            }
        }
        this.setState({editingComputerId: null});
    }

    findComputer(editingComputerId) {
        return this.state.computers.find(computer => computer.id === editingComputerId);
    }
}

function ComputerListing(props) {
    let computersElem = props.computers.map(computer => <Computer handleShowEditComputer={props.handleShowEditComputer} {...computer} />);
    return (
        <ul>
            {computersElem}
        </ul>
    );
}

function Computer(props) {
    return (
        <li>
            <h3>{props.name} <button onClick={() => props.handleShowEditComputer(props.id)}>Edit</button></h3>
            <div>Model: {props.model}</div>
        </li>
    );
}

class ComputerAddOrEdit extends Component {
    constructor(props) {
        super(props);
        if (props.computerToEdit) {
            this.state = props.computerToEdit; // todo clone object
        } else {
            this.state = {
                name: "",
                model: ""
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

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleSaveComputer(this.state)
    }

    render() {
        return (
            <div>
                <h3>{this.props.computerToEdit ? 'Edit ' + this.state.name  : 'Create ' + this.state.name}</h3>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            Name:
                            <input name="name" type="text" value={this.state.name} onChange={this.handleChange}/>
                        </label>
                    </div>

                    <div>
                        <label>
                            Model:
                            <input name="model" type="text" value={this.state.model} onChange={this.handleChange}/>
                        </label>
                    </div>
                    <input type="submit" value="Submit" onSubmit={this.handleSubmit}/>
                </form>
            </div>

        );
    }
}

class ParentComp extends Component {
    render() {
        const numbers = [1, 2, 3, 4, 5];
        const children = numbers.map((number) =>
            <ChildComp key={number} id={number}/>
        );
        return (
            <div>
                Parent component
                <ul>
                    {children}
                    <ChildFuncComp id={6}/>
                </ul>
            </div>
        );
    }
}

class ChildComp extends Component {
    constructor(props) {
        super(props);
        this.state = {enabled: false}
        this.handleClick = this.handleClick.bind(this);

    }

    render() {
        return (
            <li onClick={this.handleClick}>Child component {this.props.id} -
                enabled: {this.state.enabled ? 'true' : 'false'}</li>
        );
    }

    handleClick() {
        this.setState((prevState) => ({enabled: !prevState.enabled}));
    }
}

function ChildFuncComp(props) {
    return (
        <li>Child functional component {props.id}</li>
    );
}

ReactDOM.render(<ComputerDisplay/>, document.getElementById('root'));

