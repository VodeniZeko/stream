import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../action";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
	onSubmit = formValues => {
		this.props.createStream(formValues);
	};

	render() {
		return (
			<div>
				<h3>Create new stream</h3>
				<StreamForm onFormSubmit={this.onSubmit} />
			</div>
		);
	}
}

export default connect(
	null,
	{ createStream }
)(StreamCreate);
