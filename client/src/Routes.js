import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import ManageRole from "./ManageRole/ManageRole";
import MyProject from "./MyProject/MyProject";
import MyTicket from "./MyTicket/MyTicket";
import UserProfile from "./UserProfile/UserProfile";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Dashboard} />
				<Route path="/ManageRole" component={ManageRole} />
				<Route path="/MyProject" component={MyProject} />
				<Route path="/MyTicket" component={MyTicket} />
				<Route path="/UserProfile" component={UserProfile} />
				<Route path="/signin" component={SignIn} />
				<Route path="/signup" component={SignUp} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
