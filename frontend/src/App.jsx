import { useState, useEffect } from "react"
import Navbar from './components/Navbar.jsx'
import ClockPage from "./pages/ClockPage.jsx";
import AlarmsPage from "./pages/AlarmsPage.jsx"

function App() {
  const [scrollY, setScrollY] = useState({scrollPosnY: 0, clientY: 0, velocity: 0});
  const [activePage, setActivePage] = useState(undefined);

  useEffect(() => {
    if(!window) return;
    
    const handleTouchStart = e => {
      const touch = e.changedTouches[0];

      setScrollY(prev => {return {...prev, clientY: touch.clientY}})
    }

    const handleTouchMove = e => {
      const touch = e.changedTouches[0];
      
      const deltaY = scrollY.scrollPosnY - (touch.clientY - scrollY.clientY);
      window.scrollTo(0, deltaY/2);
      // const scrollToDeltaY = () => {
      //   window.requestAnimationFrame(scrollToDeltaY)
      //   window.scrollTo(0, deltaY);
      // }
      // scrollToDeltaY();

      setScrollY(prev => {return {...prev, scrollPosnY: window.scrollY, clientY: touch.clientY, velocity: deltaY}})
    }
    const handleTouchEnd = () => {
      console.log('pointer up')
      setScrollY(prev => {return {...prev, scrollPosnY: window.scrollY}}) 
    }
    
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    }
  }, [scrollY]);

  return (
    <main
      className="h-dvh flex flex-col justify-start items-center p-4 gap-4 bg-[#101010]"
      // className="h-[3000px]"
    >
      <div
        className="h-full flex-[0.1] w-full" 
      >
        <Navbar activePage={activePage} setActivePage={setActivePage}/>
      </div>
      {activePage === 'Clock' && <ClockPage />}
      {activePage === 'Alarm' && <AlarmsPage />}
      {/* {activePage === 'Settings' && <SettingsPage />} */}
    </main>
  )
}

export default App
