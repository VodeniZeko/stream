import React from "react";
import Modal from "../Modal";
import { connect } from "react-redux";
import history from "../../history";
import { fetchStream, deleteStream } from "../../action";
import { Link } from "react-router-dom";

class StreamDelete extends React.Component {
	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.fetchStream(id);
	}

	renderActions() {
		const { id } = this.props.match.params;
		return (
			<React.Fragment>
				<Link to={"/"} className="ui primary button">
					Cancel{" "}
				</Link>
				<button
					onClick={() => this.props.deleteStream(id)}
					className="ui red button"
				>
					Delete
				</button>
			</React.Fragment>
		);
	}

	renderContent() {
		if (!this.props.stream) {
			return "Are you sure you want to delete stream !!!";
		}
		return `Are you sure you want to delete ${this.props.stream.title} !!!`;
	}
	render() {
		return (
			<div>
				StreamDelete
				<Modal
					onDismiss={() => history.push("/")}
					title="Delete Stream"
					content={this.renderContent()}
					actions={this.renderActions()}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return { stream: state.stream[ownProps.match.params.id] };
};

export default connect(
	mapStateToProps,
	{ fetchStream, deleteStream }
)(StreamDelete);
