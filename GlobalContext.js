import react, { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext(null);

export function UserProvider(props) {
	const [avatarClicked, setAvatarClicked] = useState(false);

	// const callCount = () => {
	//     console.log(count)
	// }

	return (
		<UserContext.Provider value={{ avatarClicked, setAvatarClicked }}>
			{props.children}
		</UserContext.Provider>
	);
}
