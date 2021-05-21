import Head from "next/head";
import Sidebar from "../components/Sidebar";
import SideSideBar from "../components/SideSideBar";
import { useState, useContext } from "react";
import { UserContext } from "../GlobalContext";

export default function Home() {
	const { avatarClicked, setAvatarClicked } = useContext(UserContext);
	return (
		<div>
			<SideSideBar />
			<Head>
				<title>Whatsapp Alpha</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Sidebar />
		</div>
	);
}
