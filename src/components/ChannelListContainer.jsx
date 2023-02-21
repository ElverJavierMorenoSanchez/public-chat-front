import { useState } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./";
import Cookies from "universal-cookie";
import chatIcon from "../assets/chatIcon.png";
import LogoutIcon from "../assets/logout.png";

const cookies = new Cookies();

const SideBar = () => {
  const logout = () => {
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");
    cookies.remove("phoneNumber");
    cookies.remove("token");

    window.location.reload();
  };

  return (
    <div className="channel-list__sidebar">
      <div className="channel-list__sidebar__icon1">
        <div className="icon1__inner">
          <img src={chatIcon} alt="HospitalIcon" width="30" />
        </div>
      </div>
      <div className="channel-list__sidebar__icon2">
        <div className="icon1__inner" onClick={logout}>
          <img src={LogoutIcon} alt="LogoutIcon" width="30" />
        </div>
      </div>
    </div>
  );
};

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Public Chat</p>
  </div>
);

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};
const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};

const ChannelListContent = ({
  isCreating,
  setIsCreating,
  isEditing,
  setIsEditing,
  setCreateType,
  setToggleContainer,
}) => {
  const { client } = useChatContext();
  const filters = { members: { $in: [client.userID] } };

  return (
    <>
      <SideBar />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch setToggleContainer={setToggleContainer} />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              setCreateType={setCreateType}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="team"
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              setCreateType={setCreateType}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="messaging"
            />
          )}
        />
      </div>
    </>
  );
};

const ChannelListContainer = ({
  setCreateType,
  setIsCreating,
  setIsEditing,
}) => {
  const [toggleContaineer, setToggleContainer] = useState(false);

  return (
    <>
      <div className="channel-list__container">
        <ChannelListContent
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setCreateType={setCreateType}
        />
      </div>
      <div
        className="channel-list__container-responsive"
        style={{
          left: toggleContaineer ? "0%" : "-87%",
          backgroundColor: "#005fff",
        }}
      >
        <ChannelListContent
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setCreateType={setCreateType}
          setToggleContainer={setToggleContainer}
        />
        <div
          className="channel-list__container-toggle"
          onClick={() => setToggleContainer((prev) => !prev)}
        >
          {toggleContaineer ? <p>⮜</p> : <p>➤</p>}
        </div>
      </div>
    </>
  );
};

export default ChannelListContainer;
