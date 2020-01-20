import React from 'react';
import { Container, Image, Menu } from 'semantic-ui-react'
import 'bootstrap/dist/css/bootstrap.min.css';

const MenuComponent = () => (
    <Menu fixed='top' borderless>
    <Container>
      <Menu.Item>

        <Image 
        size='small' 
        src='/src/images/logo.png'
        />
      
      </Menu.Item>

      <Menu.Item position='right'>
          <h1> Simple CBUCKS Converter </h1>
      </Menu.Item>

      <Menu.Item as='a' position='right'>

        <Image
        style={{ marginLeft: '1em' }}
        size='tiny' 
        src='https://static.coingecko.com/s/coingecko-logo-white-0f3ee490450b8f9d2eb4ca4b1d669dfbadd0c8678d501bcdc67adda081d06663.png' />
      
      </Menu.Item>
{/* 
      <Menu.Item as='a' position='left'>

        <Image
        style={{ marginLeft: '1em' }} 
        size='tiny'
        src='/src/images/coincodexlogowhite.png' />
      
      </Menu.Item> */}

    </Container>
  </Menu>
)

export default MenuComponent;