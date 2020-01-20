import React from 'react';
import { Container, Image, Menu } from 'semantic-ui-react'
import 'bootstrap/dist/css/bootstrap.min.css';

const MenuComponent = () => (
    <Menu fixed='top' borderless>
    <Container>

      <Menu.Item position='left'>
      </Menu.Item>

      <Menu.Item>

        <Image 
        size='medium' 
        src='https://i.imgur.com/yJmyJPd.png'
        />
      
      </Menu.Item>

      <Menu.Item position='right'>
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