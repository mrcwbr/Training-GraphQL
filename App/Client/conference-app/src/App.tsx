import './App.css';
import Layout, { Root, getHeader, getDrawerSidebar, getSidebarTrigger, getSidebarContent, getCollapseBtn, getContent, getFooter } from '@mui-treasury/layout';
import styled from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';
import ListItemText from '@material-ui/core/ListItemText';
import { Mic } from '@material-ui/icons';
import NavHeader from './components/navigation/NavHeader';
import Typography from '@material-ui/core/Typography';
import { HeaderText } from './styled/Header.styled';
import NavMenu from './components/navigation/NavMenu';
import Talks from './components/talks/Talks';
import Speakers from './components/speakers/Speakers';

const scheme = Layout();

scheme.configureHeader((builder) => {
  builder
    .registerConfig('xs', {
      position: 'sticky',
    })
    .registerConfig('md', {
      position: 'relative', // won't stick to top when scroll down
    });
});

scheme.configureEdgeSidebar((builder) => {
  builder
    .create('unique_id', { anchor: 'left' })
    .registerTemporaryConfig('xs', {
      width: 'auto', // 'auto' is only valid for temporary variant
    })
    .registerPermanentConfig('md', {
      width: 256, // px, (%, rem, em is compatible)
      collapsible: true,
      collapsedWidth: 64,
    });
});

scheme.enableAutoCollapse('unique_id', 'md');

const Header = getHeader(styled);
const DrawerSidebar = getDrawerSidebar(styled);
const SidebarTrigger = getSidebarTrigger(styled);
const SidebarContent = getSidebarContent(styled);
const CollapseBtn = getCollapseBtn(styled);
const Content = getContent(styled);
const Footer = getFooter(styled);

const App = () => {
  return (
    <Root scheme={scheme}>
      {({ state: { sidebar } }) => (
        <>
          <CssBaseline />
          <Header>
            <Toolbar>
              <SidebarTrigger sidebarId="unique_id" />
              <HeaderText noWrap color={'textSecondary'}>
                NDC London 2019
              </HeaderText>
            </Toolbar>
          </Header>
          <DrawerSidebar sidebarId="unique_id">
            <SidebarContent>
              <NavHeader />
              <NavMenu />
            </SidebarContent>
            <CollapseBtn />
          </DrawerSidebar>
          <Content>
            {/*  <Talks /> */}
            <Speakers />
          </Content>
          <Footer></Footer>
        </>
      )}
    </Root>
  );
};

export default App;
