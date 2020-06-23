/* 开源-组件 */
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
/* 自研-工具 */
import { handlePageTitle } from '@/utilities/framework';

const AuthLayout = props => {
  const { children, location } = props;

  return (
    <Fragment>
      <Helmet>
        <title>{handlePageTitle(location.pathname)}</title>
      </Helmet>
      {children}
    </Fragment>
  );
}

export default AuthLayout;
