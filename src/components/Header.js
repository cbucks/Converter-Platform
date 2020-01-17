import React from 'react';
import { Header, Image } from 'semantic-ui-react'
import 'bootstrap/dist/css/bootstrap.min.css';

const HeaderComponent = () => (
  <Header as='h1'>

    <Image 
    className=''
    src='/src/images/logo.png' 
    size='massive'/>

  </Header>
)

export default HeaderComponent;