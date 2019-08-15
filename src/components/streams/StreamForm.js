import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className=" message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}

	renderThis = ({ label, input, meta }) => {
		const textFieldError = `field ${
			meta.error && meta.touched ? "error" : ""
		}`;
		return (
			<div className={textFieldError}>
				<label>{label}</label>
				<input {...input} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		);
	};

	onSubmit = formValues => {
		this.props.onFormSubmit(formValues);
	};

	render() {
		return (
			<form
				onSubmit={this.props.handleSubmit(this.onSubmit)} //handleSubmit given by redux-form then pass your helper func
				className="ui form error"
			>
				<Field
					name="title"
					component={this.renderThis}
					label="Enter title"
				/>
				<Field
					name="description"
					component={this.renderThis}
					label="Enter description"
				/>
				<button className="ui button primary">Submit</button>
			</form>
		);
	}
}

const validate = formValues => {
	const error = {};
	if (!formValues.title) {
		error.title = "title needed";
	}

	if (!formValues.description) {
		error.description = "description needed";
	}
	return error;
};

export default reduxForm({
	form: "generalForm",
	validate: validate
})(StreamForm);
