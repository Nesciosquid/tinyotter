import React from 'react';
import { Layout, Header, Navigation, Content } from 'react-mdl';

export const NavBar = ({ children }) => (
  <div>
    <Layout fixedHeader>
      <Header
        title={
          <div>
            <img
              role="presentation"
              style={{ maxHeight: '40px', height: '40px' }}
              src="./tiny_ott_logo.png"
            />
          </div>
          }
      >
        <Navigation>
          <a href="http://github.com/Nesciosquid/tinyotter">
            <img
              role="presentation"
              style={{ maxHeight: '30px', height: '30px' }}
              src="./GitHub-Mark-Light-120px-plus.png"
            />
          </a>
        </Navigation>
      </Header>
      <Content>
        {children}
      </Content>
    </Layout>
  </div>
);

NavBar.propTypes = {
  children: React.PropTypes.object,
};
