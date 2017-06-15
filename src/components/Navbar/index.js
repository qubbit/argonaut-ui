// @flow
import React from 'react';
import { Link } from 'react-router';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  navbar: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 1rem',
    height: '70px',
    background: '#fff',
    boxShadow: '0 1px 1px rgba(0,0,0,.1)',
  },

  link: {
    color: '#555459',
    fontSize: '22px',
    display: 'flex',
    alignItems: 'center',
    ':hover': {
      textDecoration: 'none',
    },
    ':focus': {
      textDecoration: 'none',
    },
  },
});

const Navbar = () =>
  <nav className={css(styles.navbar)}>
    <Link to="/" className={css(styles.link)}>
      <img width='48' alt='Argonaut' src='/images/argonaut_v2.svg'/>
      <span style={{ fontSize: '2.2rem', color: '#000', marginLeft: '13px' }} className="logo-text">Argonaut</span>
    </Link>
  </nav>;

export default Navbar;
