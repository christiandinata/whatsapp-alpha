import styled from "styled-components";
import { Button } from "@material-ui/core";
import Head from "next/head";
import { auth, provider } from "../firebase";

function Login() {
	const SignInWithGoogle = () => {
		auth.signInWithPopup(provider).catch(alert.message);
	};

	return (
		<div>
			<Head>
				<title>Login</title>
			</Head>
			<Container>
				<LoginContainer>
					<Logo src="http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c543.png" />
					<Button variant="outlined" onClick={SignInWithGoogle}>
						Sign in with google
					</Button>
				</LoginContainer>
			</Container>
		</div>
	);
}

export default Login;

const Container = styled.div`
	display: grid;
	/* place-items: center; */
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: whitesmoke;
`;

const LoginContainer = styled.div`
	padding: 100px;
	display: flex;
	flex-direction: column;
	background-color: white;
	border-radius: 6px;
	box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
	/* align-items: center; */
`;

const Logo = styled.img`
	height: 200px;
	width: 200px;
	margin-bottom: 50px;
`;
