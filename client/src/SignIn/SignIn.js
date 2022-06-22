import React, { useState } from "react";
import showPwdImg from "../Img/Password/red-eye.png";
import hidePwdImg from "../Img/Password/hide.png";
import "./Sign.css";
const SignIn = () => {
	const initialState = {
		email: "",
		password: "",
	};
	const [formData, setFormData] = useState(initialState);
	const [showPassword, setShowPassword] = useState(false);
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<>
			<div className="logo text-center">
				<h1>Bug Tracker</h1>
			</div>
			<div className="wrapper">
				<div className="inner-warpper text-center">
					<h3 className="title">Login to your account</h3>
					<form id="formvalidate" autoComplete="off">
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
						<div className="input-group pwd-container">
							{/* <label className="palceholder" for="userPassword">
								Password
							</label> */}
							<input
								className="form-control"
								name="password"
								id="password"
								onChange={handleChange}
								type={showPassword ? "text" : "password"}
								placeholder="Password"
							/>
							<img
								height="20px"
								width="20px"
								title={showPassword ? "Hide password" : "Show password"}
								src={showPassword ? hidePwdImg : showPwdImg}
								onClick={() => setShowPassword((prevState) => !prevState)}
								id="input_img"
								alt="eyes"
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
							<a className="forgot pull-right" href="/">
								Forgot Password?
							</a>
						</div>
					</form>
				</div>
				<div className="signup-wrapper text-center">
					<a href="/signup">
						Don't have an accout?{" "}
						<span className="text-primary">Create One</span>
					</a>
				</div>
			</div>
		</>
	);
};

export default SignIn;
