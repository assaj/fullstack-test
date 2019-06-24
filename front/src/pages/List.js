import React from 'react';
import Navbar from '../components/Header/index'
import Cards from '../components/Cards/index'

import 'bootstrap/dist/css/bootstrap.min.css'

function list() {
  return (
    <div className="list">
      <Navbar />
      <Cards />
    </div>
  )
}

export default list;
