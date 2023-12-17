import {Avatar, Typography} from "@mui/material";

const ChatPage = () => {
    return <div>
        <div style={{display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'center'}}>
            <Avatar alt="avatar" src="/static/images/avatar/2.jpg"/>
                <Typography fontWeight={"bold"}>닉네임</Typography>
            <Typography>프로필 이미지는 안 보이는 게 낫나? 낫나? 낫나?</Typography>
        </div>
		<div style={{width: "100%"}}>
			<div style={{width: "100%", backgroundColor: "gray", padding: 10}}>
				<input/>
				<button>제출</button>
			</div>
		</div>
    </div>;
};

export default ChatPage;
