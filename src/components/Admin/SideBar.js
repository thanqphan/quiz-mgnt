import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarFooter,
  SidebarContent,
  SidebarHeader,
} from "react-pro-sidebar";
import {
  FaGem,
  FaList,
  FaRegLaughWink,
  FaHeart,
  FaGithub,
  FaTachometerAlt,
} from "react-icons/fa";
import sidebarBg from "../../assets/bg2.jpg";
import { MdDashboard, MdQuiz } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const SideBar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
  //   const { image, collapsed, toggled, handleToggleSidebar } = props;
  const navigate = useNavigate();
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <MdQuiz size={"3em"} />
            <span
              onClick={() => {
                navigate("/");
              }}
            >
              React Js
            </span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<MdDashboard />}>
              Dashboard
              <Link to="/admins"></Link>
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu icon={<FaGem />} title="Features">
              <MenuItem>
                User management
                <Link to="/admins/user-management"></Link>
              </MenuItem>
              <MenuItem>
                Quiz management
                <Link to="/admins/quiz-management"></Link>
              </MenuItem>
              <MenuItem>
                Question management
                <Link to="/admins/question-management"></Link>
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://github.com/azouaoui-med/react-pro-sidebar"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                View source
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
      ;
    </>
  );
};

export default SideBar;
