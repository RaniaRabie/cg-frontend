import { useEffect, useState } from 'react'
import './App.css'
import { Outlet } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)
  async function fetchData() {
    try{
      const res = await fetch('http://careerguidance.runasp.net/')
      const data = res.json();
      return data;

    }catch (err){
      console.log(err)
    }
  }
  useEffect(()=>{
    console.log(fetchData())
  },[])

  return (
    <>
      <Outlet/>
    </>
  )
}

export default App
