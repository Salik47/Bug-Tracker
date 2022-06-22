import React, { useState } from "react";

const SignUp = () => {
	const initialState = {
		name: "",
		email: "",
		password: "",
	};
	const [formData, setFormData] = useState(initialState);
	const [showPassword, setShowPassword] = useState(false);
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleShowPassword = () =>
		setShowPassword((prevShowPassword) => !prevShowPassword);
	return (
		<>
			<div className="logo text-center">
				<h1>Bug Tracker</h1>
			</div>
			<div className="wrapper">
				<div className="inner-warpper text-center">
					<h3 className="title">Create new account</h3>
					<form id="formvalidate">
						<div className="input-group">
							{/* <label className="palceholder" for="userName">
								User Name
							</label> */}
							<input
								className="form-control"
								name="name"
								id="name"
								onChange={handleChange}
								type="text"
								placeholder="User Name"
							/>
							<span className="lighting"></span>
						</div>
						<div className="input-group">
							{/* <label className="palceholder" for="userName">
								User Name
							</label> */}
							<input
								className="form-control"
								name="email"
								id="email"
								onChange={handleChange}
								type="email"
								placeholder="Email"
							/>
							<span className="lighting"></span>
						</div>
						<div className="input-group">
							{/* <label className="palceholder" for="userPassword">
								Password
							</label> */}
							<input
								className="form-control"
								name="password"
								id="password"
								onChange={handleChange}
								type="password"
								placeholder="Password"
							/>
							<span className="lighting"></span>
						</div>

						<button type="submit" id="login">
							Login
						</button>
						<div className="clearfix supporter">
							<div className="pull-left remember-me">
								<input id="rememberMe" type="checkbox" />
								<label for="rememberMe">Remember Me</label>
							</div>
						</div>
					</form>
				</div>
				<div className="signup-wrapper text-center">
					<a href="/signin">
						Already have an account? <span className="text-primary">Login</span>
					</a>
				</div>
			</div>
		</>
	);
};

export default SignUp;
