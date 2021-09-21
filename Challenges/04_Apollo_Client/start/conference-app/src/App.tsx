import './App.css';
import Layout, { Root, getHeader, getDrawerSidebar, getSidebarTrigger, getSidebarContent, getCollapseBtn, getContent, getFooter } from '@mui-treasury/layout';
import styled from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import NavHeader from './components/navigation/NavHeader';
import { HeaderGrow, HeaderText } from './styled/Header.styled';
import NavMenu from './components/navigation/NavMenu';
import Talks from './components/talks/Talks';
import Speakers from './components/speakers/Speakers';
import { Route, Switch } from 'react-router-dom';
import Notifications from './components/Notifications';
import Attendees from './components/attendees/Attendees';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { Button } from '@material-ui/core';

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
  const { loginWithRedirect, isAuthenticated, isLoading, logout } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect, isLoading]);

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
              <HeaderGrow />
              <Button variant="outlined" color="secondary" onClick={() => logout({ returnTo: window.location.origin })}>
                Logout
              </Button>
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
            <Switch>
              <Route path="/talks">
                <Talks />
              </Route>
              <Route path="/speakers">
                <Speakers />
              </Route>
              <Route path="/attendees">
                <Attendees />
              </Route>
              <Route path="/">
                <Talks />
              </Route>
            </Switch>
          </Content>
          <Footer></Footer>
          <Notifications />
        </>
      )}
    </Root>
  );
};

export default App;
