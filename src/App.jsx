import { useState } from 'react'
import './App.css'
import {Button} from '@/components/ui/button'
import Hero from '@/components/custom/hero.jsx'
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-white">
      <Hero/>
    </div>
  );
}

export default App;

