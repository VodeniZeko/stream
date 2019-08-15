import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../action";

class GoogleAuth extends Component {
	componentDidMount() {
		window.gapi.load("client:auth2", () => {
			window.gapi.client
				.init({
					clientId:
						"929308809638-hcp1f8nm8k69jauhcg3jvps9hp1lo3dp.apps.googleusercontent.com",
					scope: "email"
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					this.authChanged(this.auth.isSignedIn.get());
					this.auth.isSignedIn.listen(this.authChanged);
				});
		});
	}

	authChanged = isSignedIn => {
		if (isSignedIn) {
			this.props.signIn(this.auth.currentUser.get().getId());
		} else {
			this.props.signOut();
		}
	};

	onSignInClick = () => {
		this.auth.signIn();
	};

	onSignOutClick = () => {
		this.auth.signOut();
	};

	renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn) {
			return (
				<button
					onClick={this.onSignOutClick}
					className="ui red google button"
				>
					<i className="google icon" />
					Sign out!
				</button>
			);
		} else {
			return (
				<button
					onClick={this.onSignInClick}
					className="ui blue google button"
				>
					<i className="google icon" />
					Sign in with Google!
				</button>
			);
		}
	}
	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}

const mapStateToProps = state => {
	return { isSignedIn: state.auth.IsSignedIn };
};

export default connect(
	mapStateToProps,
	{ signIn, signOut }
)(GoogleAuth);
