import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import SideBar from "./SideBar/SideBar";
import FriendsSideBar from "./FriendsSideBar/FriendsSideBar";
import Messenger from "./Messenger/Messenger";
import AppBar from "./AppBar/AppBar";
import { connectWithSocketServer, UserDetails } from "../../socket/socketConnection";
import { useAppSelector } from "../../store";
import VideoChat from "../../components/VideoChat";

const Wrapper = styled("div")({
    width: "100%",
    height: "100vh",
    display: "flex",
});

const Dashboard = () => {
    const userDetails = useAppSelector((state) => state.auth.userDetails);
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = "token" in userDetails;

        if (!isLoggedIn) {
            navigate("/login");
        } else {
            // connect to socket server
            connectWithSocketServer(userDetails as UserDetails);
        }

    }, [userDetails, navigate]);


    return (
        <Wrapper>
            <SideBar />
            <FriendsSideBar />
            <Messenger />
            <AppBar />
            <VideoChat/>
        </Wrapper>
    );
};

export default Dashboard;
