import React, { useEffect } from 'react';
import Router from 'next/router';
import { useFetchUser } from '../utils/user';

export default function Index() {
  const { user, loading } = useFetchUser();

  useEffect(() => {
    const { pathname } = Router;
    if (pathname == '/') {
      user ? Router.push('/note') : Router.push('/product');
    }
    if (pathname == '/#') {
      user ? Router.push('/note') : Router.push('/product');
    }
    if (pathname == '') {
      user ? Router.push('/note') : Router.push('/product');
    }
  });
  return <div className="main"></div>;
}
