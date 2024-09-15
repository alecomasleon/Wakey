import { useState, useEffect } from "react";
import Navbar from './components/Navbar.jsx';
import ClockPage from "./pages/ClockPage.jsx";
import AlarmsPage from "./pages/AlarmsPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";

function App() {
  const [scrollY, setScrollY] = useState({scrollPosnY: 0, clientY: 0, velocity: 0});
  const [activePage, setActivePage] = useState(undefined);

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
      {activePage === 'Settings' && <SettingsPage />}
      {/* {activePage === 'Settings' && <SettingsPage />} */}
    </main>
  )
}

export default App
