import React, { useState } from 'react';
import './App.css';
import HeaderSection from './components/HeaderSection'; 
import DetailSection from './components/DetailSection'; 
import ItemMaster from './components/ItemMaster';
import PostDataForm from './components/PostDataForm'

 
const App = () => {
return (
    <div>
      <HeaderSection/> 
      <DetailSection/>
      <ItemMaster/>      
      {/* <PostDataForm/> */}
    </div>
  );
};

export default App;
