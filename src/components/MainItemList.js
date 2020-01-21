import React,{useState} from 'react';
import { Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import 'styles/menuStyle.css';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'images/Logo.png';

const { SubMenu } = Menu;
const bc = '#78909c';
const toolheight = 48;
const drawerWidth = 201;
const menucolor = '#78909c';

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth - 1,
      flexShrink: 0,
      backgroundColor: menucolor,
    },
  },
  toolbar: {
    height: toolheight,
    width: '70%',
    textAlign: 'center',
    margin: '0px auto',
    paddingTop: theme.spacing(1),

  },
  drawerPaper: {
    width: drawerWidth,
  },

  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 'flex',
  },
  imageStyle: {
    width: '100%',

  },

  divMenuItemList: {
    paddingTop: theme.spacing(4),
  },
  button: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(15),
    textAlign: 'right',
  },
}));


const MainItemList = () => {
  const classes = useStyles();
  const [openKeys, setOpenKeys] = useState(['sub1', 'sub2', 'sub3']);


  const onOpenChange = openKeys => {
    setOpenKeys(openKeys);
  };

  const divmenu = {
    fontWeight: "500",
  }
  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <div >
        <div className={classes.toolbar}>
          <img alt="으엑" src={Image} className={classes.imageStyle} />
        </div>

        <div className={classes.divMenuItemList}>
          <div style={divmenu}>
            <Menu
              mode="inline"
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              style={{ width: 200, backgroundColor: bc }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span style={{ color: '#eceff1' }}>
                    <Icon type="appstore" />
                    <span >계약 정보 관리</span>
                  </span>
                }
              >
            <Menu.Item key="1" ><Link to="/cont"><Icon type="reconciliation" />계약 라이센스</Link></Menu.Item>
            <Menu.Item key="2" ><Link to="/contcust"><Icon type="user" />계약 고객 관리</Link></Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span style={{ color: '#eceff1' }}>
                <Icon type="appstore" />
                <span>임시 라이센스 관리</span>
              </span>
            }
          >
            <Menu.Item key="5"><Link to="/possiblecont"><Icon type="reconciliation"/>임시 라이센스</Link></Menu.Item>
            <Menu.Item key="6"><Link to="/possiblecustomer"><Icon type="user" />가망 고객 관리</Link></Menu.Item>
            <Menu.Item key="7"><Link to="/meeting"><Icon type="team" />미팅이력 관리</Link></Menu.Item>
          </SubMenu>
          <SubMenu
              key="sub3"
              title={
                <span style={{ color: '#eceff1' }}>
                <Icon type="appstore" />
                <span>관리자 페이지</span>
              </span>
              }
          >
              <Menu.Item key="8"><Link to="/product"><Icon type="reconciliation"/>제품관리</Link></Menu.Item>
              <Menu.Item key="9"><Link to="/manager"><Icon type="user" />b2en 담당자 관리</Link></Menu.Item>
              <Menu.Item key="10"><Link to="/org"><Icon type="team" />고객 관리</Link></Menu.Item>
          </SubMenu>
        </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default MainItemList