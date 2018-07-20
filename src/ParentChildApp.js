import {Component} from "react";

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