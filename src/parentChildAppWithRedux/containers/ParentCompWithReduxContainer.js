import {connect} from "react-redux";
import {toggleEnabled} from "../actions";
import ParentComp from "../components/ParentChildComp";

const mapStateToProps = state => ({
    items: state.items
});

const mapDispatchToProps = dispatch => ({
    handleClick: (id) => {
        dispatch(toggleEnabled(id))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)((ParentComp));