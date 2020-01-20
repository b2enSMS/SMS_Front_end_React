import React from 'react';
import { Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import 'styles/menuStyle.css';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;
const bc = '#4E7097';


class MainItemList extends React.Component {
  // submenu keys of first level


  rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];
  state = {
    openKeys: ['sub1', 'sub2', 'sub3'],
  };

  onOpenChange = openKeys => {
    this.setState({ openKeys });
  };

  render() {
    const divmenu = {
      fontWeight: "500",
    }
    return (
      <div style={divmenu}>
        <Menu
          mode="inline"
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          style={{ width: 200, backgroundColor: bc }}
        >
          <SubMenu
            key="sub1"
            title={
              <span style={{ color: '#AAFFBE' }}>
                <Icon type="appstore" />
                <span >계약 정보 관리</span>
              </span>
            }
          >

            <Menu.Item key="1" ><Link to="/cont"><Icon type="reconciliation" />계약 라이선스</Link></Menu.Item>
            <Menu.Item key="2" ><Link to="/contcust"><Icon type="user" />계약 고객 관리</Link></Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span style={{ color: '#AAFFBE' }}>
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
                <span style={{ color: '#AAFFBE' }}>
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
    );
  }
}
export default MainItemList