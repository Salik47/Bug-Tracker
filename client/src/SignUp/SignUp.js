import React, { useState } from "react";
import showPwdImg from "../Img/Password/red-eye.png";
import hidePwdImg from "../Img/Password/hide.png";
import { signup } from "../API/index";
const SignUp = ({ history }) => {
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
	});

	const { name, email, password } = values;

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};
	const [showPassword, setShowPassword] = useState(false);

	const clickSubmit = (event) => {
		console.log(name, email, password);
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });
		signup({ name, email, password }).then((data) => {
			if (!data.success) {
				setValues({
					...values,
				});
			} else {
				setValues({
					...values,
					name: "",
					email: "",
					password: "",
				});
				history.push({
					pathname: "/signin",
					state: {
						message: "Account Created Successfully.",
					},
				});
			}
		});
	};
	return (
		<>
			<div className="row formF">
				<section className="col-md-4"></section>
				<section className="col-md-4 inputF">
					<hr />
					<div className="text-center">
						<h1 className="headingF">Bug Tracker</h1>
					</div>
					<hr />
					<form>
						<div className="form-group">
							<label for="nameS">Name:</label>
							<br />

							<input
								type="text"
								className="form-control"
								name="name"
								id="nameS"
								onChange={handleChange("name")}
								value={name}
								placeholder="bugtrack"
								required
							/>
						</div>
						<div className="form-group">
							<label for="emailS">Email:</label>
							<br />

							<input
								type="email"
								className="form-control"
								name="email"
								id="emailS"
								onChange={handleChange("email")}
								value={email}
								placeholder="bugtrack@gmail.com"
								required
							/>
						</div>
						<div className="form-group pass pwd-container">
							<label for="passwordS">Password:</label>
							<br />
							<input
								name="password"
								onChange={handleChange("password")}
								type={showPassword ? "text" : "password"}
								id="passwordS"
								placeholder="Password"
								className="form-control"
								value={password}
								required
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
						</div>
						<br />
						<div className="text-center">
							<button
								type="submit"
								onClick={clickSubmit}
								className="btn btn-primary ButtonF"
							>
								Submit
							</button>
						</div>
						<div>
							<p className="signinup">
								Already Registered?{" "}
								<span>
									<a href="/SignIn">Login</a>
								</span>
							</p>
						</div>
					</form>
				</section>
				<section className="col-md-4"></section>
			</div>
		</>
	);
};

export default SignUp;
