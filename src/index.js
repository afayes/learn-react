import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


class ComputerDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            computers: [
                {name: 'Mac Book Pro', model: 'Early 2018'},
                {name: 'Dell', model: 'Inspiron'}],
            addingOrEditingComputer: false
        }

        this.handleShowAddComputer = this.handleShowAddComputer.bind(this);
        this.handleAddComputer = this.handleAddComputer.bind(this);
    }

    render() {
        return (
            <div>
                <h1>Computer Application v1.0 <button onClick={this.handleShowAddComputer}>Add</button></h1>
                {this.state.addingOrEditingComputer === false > 0 &&
                <ComputerListing computers={this.state.computers}/>
                }

                {this.state.addingOrEditingComputer === true > 0 &&
                <ComputerAddOrEdit handleAddComputer={this.handleAddComputer}/>
                }
            </div>
        );
    }

    handleShowAddComputer() {
        this.setState({
            addingOrEditingComputer: true
        });
    }

    handleAddComputer(computer) {
        this.setState((prevState) => {
            console.dir(prevState);
            let comps = prevState.computers.slice();
            comps.push(computer);
            return ({
                computers: comps,
                addingOrEditingComputer: false
            })
        });
    }
}

function ComputerListing(props) {
    console.dir("ComputerListing", props);
    console.dir(props);
    let computersElem = props.computers.map(computer => <Computer {...computer} />);
    // let computersElem = props.computers.map(computer =>  <Computer name={computer.name} model={computer.model} />);

    return (
        <ul>
            {computersElem}
        </ul>
    );
}

function Computer(props) {
    return (
        <li>
            <h2>{props.name}</h2>
            <div>Model: {props.model}</div>
        </li>
    );
}

class ComputerAddOrEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            model: ""
        };

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
        console.dir("computer", this.state);
        this.props.handleAddComputer(this.state)
    }

    render() {
        return (
            <div>
                <div>Create Computer</div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input name="name" type="text" value={this.state.name} onChange={this.handleChange}/>
                    </label>
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
                <ComputerDisplay/>
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

ReactDOM.render(<ParentComp/>, document.getElementById('root'));

registerServiceWorker();
