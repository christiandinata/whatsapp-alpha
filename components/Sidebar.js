import styled from "styled-components";
import * as EmailValidator from "email-validator";
import { Avatar, Button, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import { useCollection } from "react-firebase-hooks/firestore";
import Firebase, { auth, db } from "../firebase";
import firebase from "firebase";
import { useState, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Chat from "./Chat";
import { UserContext } from "../GlobalContext";

function Sidebar() {
	const [user] = useAuthState(auth);
	const { avatarClicked, setAvatarClicked } = useContext(UserContext);

	const userChatRef = db
		.collection("chats")
		.where("users", "array-contains", user.email);

	const [chatSnapshot] = useCollection(userChatRef);

	const createChat = () => {
		const input = prompt(
			"Please enter an email address for the user you wish to chat with"
		);

		if (!input) return null;
		if (
			EmailValidator.validate(input) &&
			!chatAlreadyExists(input) &&
			input !== user.email
		) {
			// adding email address to DB
			db.collection("chats").add({
				users: [user.email, input],
			});
		}
	};

	const chatAlreadyExists = (recipientEmail) =>
		// !! converts the value to true or false
		!!chatSnapshot?.docs.find(
			(chat) =>
				chat.data().users.find((user) => user === recipientEmail)
					?.length > 0
		);

	return (
		<Container>
			<Header>
				{user ? (
					<UserAvatar
						src={user.photoURL}
						onClick={() => setAvatarClicked(!avatarClicked)}
					/>
				) : (
					<UserAvatar
						onClick={() => setAvatarClicked(!avatarClicked)}>
						{user.email[0]}
					</UserAvatar>
				)}
				{/* <UserAvatar
					src={user.photoUrl}
					onClick={() => setAvatarClicked(!avatarClicked)}
				/> */}
				<IconContainer>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</IconContainer>
			</Header>
			<Search>
				<SearchIcon />
				<SearchInput placeholder="Search in chats" />
			</Search>
			<SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
			{/* List of chats */}
			{chatSnapshot?.docs.map((chat) => (
				<Chat key={chat.id} id={chat.id} users={chat.data().users} />
			))}
		</Container>
	);
}

export default Sidebar;

const Container = styled.div`
	flex: 0.45;
	border-right: 1px solid whitesmoke;
	height: 100vh;
	min-width: 300px;
	max-width: 350px;
	overflow: scroll;

	::-webkit-scrollbar {
		display: none;
	}

	--ms-overflow-style: none; // Internet Explorer and Edge
	scrollbar-width: none; // Firefox
`;

const Header = styled.div`
	display: flex;
	position: sticky;
	top: 0;
	background-color: white;
	justify-content: space-between;
	align-items: center;
	padding: 15px;
	border-bottom: 1px solid darkgrey;
`;

const UserAvatar = styled(Avatar)`
	cursor: pointer;

	:hover {
		opacity: 0.7;
	}
`;

const Search = styled.div`
	margin-top: 6px;
	color: white;
	display: flex;
	align-items: center;
	padding: 25px;
	background-color: grey;
	border-radius: 18px;
`;

const SearchInput = styled.input`
	color: white;
	background-color: grey;
	outline-width: 0;
	border: none;
	flex: 1;

	::placeholder {
		color: white;
	}
`;

const SidebarButton = styled(Button)`
	width: 100%;

	&&& {
		border-bottom: 1px solid whitesmoke;
		border-top: 1px solid whitesmoke;
	}
`;

const IconContainer = styled.div``;
