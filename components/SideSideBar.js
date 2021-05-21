import styled from "styled-components";
import { Avatar, Button } from "@material-ui/core";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { UserContext } from "../GlobalContext";
import { useContext } from "react";

function SideSideBar() {
	const [user] = useAuthState(auth);
	const { avatarClicked, setAvatarClicked } = useContext(UserContext);
	return (
		<Container avatarClicked={avatarClicked}>
			{user ? (
				<UserAvatar src={user.photoURL} />
			) : (
				<UserAvatar>{user.email[0]}</UserAvatar>
			)}
			<ButtonContainer>
				<SideSidebarButton
					variant="outlined"
					onClick={() => setAvatarClicked(!avatarClicked)}>
					Back
				</SideSidebarButton>
				<SideSidebarButton
					variant="outlined"
					onClick={() => auth.signOut()}>
					Sign Out
				</SideSidebarButton>
			</ButtonContainer>
		</Container>
	);
}

export default SideSideBar;

const Container = styled.div`
	display: grid;
	place-items: center;
	z-index: 100;
	background-color: grey;
	color: white;
	position: fixed;
	left: ${({ avatarClicked }) => (avatarClicked ? "0" : "-100%")};
	transition: 0.35s;
	padding-top: 30px;
`;

const UserAvatar = styled(Avatar)`
	cursor: pointer;

	:hover {
		opacity: 0.7;
	}
`;

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px;
`;

const SideSidebarButton = styled(Button)`
	width: 100%;
	&&& {
		background-color: white;
		margin-bottom: 20px;
	}
`;
