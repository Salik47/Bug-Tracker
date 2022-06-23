import React, { useState } from "react";
import showPwdImg from "../Img/Password/red-eye.png";
import hidePwdImg from "../Img/Password/hide.png";
import { signin, authenticate } from "../API/index";
import "./Sign.css";
const SignIn = () => {
	const [values, setValues] = useState({
		email: "",
		password: "",
	});

	const { email, password } = values;

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};
	const [showPassword, setShowPassword] = useState(false);
	const clickSubmit = (event) => {
		// console.log(name,email,password);
		event.preventDefault();

		setValues({ ...values });
		signin({ email, password }).then((data) => {
			// if (data.message) {
			// 	setValues({ ...values });
			// } else {
			// 	authenticate(data, () => {
			// 		setValues({
			// 			...values,
			// 			redirectToReferrer: true,
			// 		});
			// 	});
			// }
			console.log(data);
		});
	};
	return (
		<>
			<div className="container-fluid">
				<div className="row formF">
					<section className="col-sm-4"></section>
					<section className="col-sm-4 inputF">
						<hr />
						<div className="text-center">
							<h1 className="headingF">Bug Tracker</h1>
						</div>
						<hr />
						<form>
							<div className="form-group">
								<label for="emailS">Email:</label>
								<br />

								<input
									type="email"
									className="form-control"
									onChange={handleChange("email")}
									name="email"
									id="emailS"
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
									value={password}
									className="form-control"
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

							<div className="text-center">
								<button
									type="submit"
									className="btn btn-primary ButtonF"
									onClick={clickSubmit}
								>
									Submit
								</button>
							</div>
							<div>
								<p className="signinup">
									New Here?{" "}
									<span>
										<a href="/SignUp">SignUp</a>
									</span>
								</p>
							</div>
						</form>
					</section>
					<section className="col-sm-4"></section>
				</div>
			</div>
		</>
	);
};

export default SignIn;
