import { WanderingCubes } from "better-react-spinkit";
import styled from "styled-components";

function Loading() {
	return (
		<Center>
			<WhatsappLogo
				src="http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c543.png"
				alt="whatsapp logo"
			/>
			<WanderingCubes color="#3CBC28" size={60} />
		</Center>
	);
}

export default Loading;

const Center = styled.div`
	display: flex;
	flex-direction: column;
	/* place-items: center; */
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const WhatsappLogo = styled.img`
	margin-bottom: 30px;
	height: 200px;
`;
