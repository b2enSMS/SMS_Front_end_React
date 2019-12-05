import React from 'react';
import { Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import 'styles/menuStyle.css';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;
const bc = '#4E7097';


class MainItemList extends React.Component {
  // submenu keys of first level


  rootSubmenuKeys = ['sub1', 'sub2'];
  state = {
    openKeys: ['sub1', 'sub2'],
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
                <span >Contract</span>
              </span>
            }
          >

            <Menu.Item key="1" ><Link to="/"><Icon type="reconciliation" />License</Link></Menu.Item>
            
            <Menu.Item key="2" ><Icon type="user" />Customer</Menu.Item>
            <Menu.Item key="2" ><Link to="Customer"><Icon type="user" />Customer</Link></Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span style={{ color: '#AAFFBE' }}>
                <Icon type="appstore" />
                <span>Possible</span>
              </span>
            }
          >
            <Menu.Item key="5"><Icon type="reconciliation"/>License</Menu.Item>
            <Menu.Item key="6"><Icon type="user" />Customer</Menu.Item>
            <Menu.Item key="7"><Icon type="team" />Meeting</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
export default MainItemList