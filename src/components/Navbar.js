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
          Simple CBUCKS Converter
      </Menu.Item>

      <Menu.Item as='a' position='right'>

        <Image
        style={{ marginLeft: '1em' }}
        size='tiny' 
        src='/src/images/coingeckowhitelogo.webp' />
      
      </Menu.Item>

      <Menu.Item as='a' position='left'>

        <Image
        style={{ marginLeft: '1em' }} 
        size='tiny'
        src='/src/images/coincodexlogowhite.png' />
      
      </Menu.Item>

    </Container>
  </Menu>
)

export default MenuComponent;