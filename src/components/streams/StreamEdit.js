import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../action";
import StreamForm from "./StreamForm";
import _ from "lodash";

class StreamEdit extends React.Component {
	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.fetchStream(id);
	}

	onSubmit = formValues => {
		const { id } = this.props.match.params;
		this.props.editStream(id, formValues);
	};

	render() {
		if (!this.props.stream) {
			return <div>Loading...</div>;
		}
		return (
			<div>
				<h3 style={{ textAlign: "center" }}>Edit stream </h3>
				<StreamForm
					initialValues={_.pick(
						this.props.stream,
						"title",
						"description"
					)}
					onFormSubmit={this.onSubmit}
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
	{ fetchStream, editStream }
)(StreamEdit);
