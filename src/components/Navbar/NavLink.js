import ArchiveIcon from "../../assets/svg/ArchiveIcon";
import BellIcon from "../../assets/svg/BellIcon";
import ChatIcon from "../../assets/svg/ChatIcon";
import HomeIcon from "../../assets/svg/HomeIcon";
import OverviewIcon from "../../assets/svg/OverviewIcon";
import SettingsIcon from "../../assets/svg/SettingsIcon";
import ShopIcon from "../../assets/svg/ShopIcon";
import ComponentIcon from "../../assets/svg/ComponentIcon";
import Home from "../Home/Home";
import ContentContainer from "../ContentContainer/ContentContainer";
import Table, { dataDefault } from "../../utilsComponents/Table/Table";
import PDFBuilder from "../PDFBuilder/PDFBuilder";
import ComponentContainer from "../ComponentContainer/ComponentContainer";
import Graphs from "../Graphs/Graphs";

//Aza adino le "/" aloha path rehetra
const linksNavData = [
  {
    type: "menu",
    menuLabel: "Dashboard",
    rows: [
      {
        type: "link",
        linkTo: "/",
        label: "Home",
        icon: <HomeIcon />,
        page: <Home />,
      },
      {
        type: "link_info",
        linkTo: "/overview",
        label: "Overview",
        icon: <OverviewIcon />,
        page: (
          <ContentContainer>
            <div className="inner">
              <Table
                {...dataDefault}
                paginationOn={true}
                pageCount={15}
                rowCount={5}
                callBackPagination={async (index) => {
                  return new Promise((resolve, reject) => {
                    let end = Math.round(Math.random() * dataDefault.body.length);
                    setTimeout(() => {
                      resolve([...dataDefault.body].splice(0, end));
                    }, 1000);
                  });
                }}
              />
            </div>
          </ContentContainer>
        ),
        info: 10,
      },
      {
        type: "link_list",
        label: "Notification",
        icon: <BellIcon />,
        sublinks: [
          {
            label: "Example 1",
            linkTo: "/test/example_1",
            page: (
              <ContentContainer>
                <PDFBuilder />
              </ContentContainer>
            ),
          },
          {
            label: "Example 2",
            linkTo: "/test/example_2",
            page: <ContentContainer />,
          },
        ],
      },
    ],
  },
  {
    type: "menu",
    menuLabel: "Main menu",
    rows: [
      {
        type: "link",
        linkTo: "/components",
        label: "Components",
        icon: <ComponentIcon />,
        page: (
          <ContentContainer>
            <ComponentContainer />
          </ContentContainer>
        ),
      },
      {
        type: "link",
        linkTo: "/something",
        label: "Something very long",
        icon: <ArchiveIcon />,
        page: <></>,
      },
      {
        type: "link_info",
        linkTo: "/chat",
        label: "Chat",
        icon: <ChatIcon />,
        info: 10,
        page: (
          <ContentContainer>
            <Graphs />
          </ContentContainer>
        ),
      },
      {
        type: "link_list",
        label: "Shop",
        icon: <ShopIcon />,
        sublinks: [
          {
            label: "Example 11",
            linkTo: "/example_11",
            page: <ContentContainer />,
          },
        ],
      },
    ],
  },
  {
    type: "single",
    row: {
      type: "link",
      linkTo: "/settings",
      label: "Settings",
      icon: <SettingsIcon />,
      page: <ContentContainer />,
    },
  },
];

export const link_to_hide_nav = ["/settings", "/something", "/sign"];

export default linksNavData;
