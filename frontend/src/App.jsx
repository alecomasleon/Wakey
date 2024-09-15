import { useState, useEffect } from "react";
import Navbar from './components/Navbar.jsx';
import ClockPage from "./pages/ClockPage.jsx";
import AlarmsPage from "./pages/AlarmsPage.jsx";
import AlarmPage from "./pages/AlarmPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";

import { ALARM_ARRAY } from "./alarm.js";

function App() {
  const [activePage, setActivePage] = useState(undefined);
  const [alarmActive, setAlarmActive] = useState(false);

  const checkAlarm = () => {
    const date = new Date;

    const time = `${date.getHours()}:${date.getMinutes()}`;
    const alarmIndex = ALARM_ARRAY.findIndex(alarm => alarm.time === time);

    if(alarmIndex === -1) return 'no alarm';
    else setAlarmActive(true);
  }

  // useEffect(() => {
  //   setInterval(() => {
  //     checkAlarm();
  //   }, 1000);
  // }, []);

  return (
    <main
      className="max-h-full relative h-dvh flex flex-col justify-start items-center p-4 gap-4 bg-[#101010] overflow-hidden"
    >
      {alarmActive && <AlarmPage />}
      <div
        className="h-full flex-[0.1] w-full min-h-max" 
      >
        <Navbar activePage={activePage} setActivePage={setActivePage}/>
      </div>
      {activePage === 'Clock' && <ClockPage />}
      {activePage === 'Alarm' && <AlarmsPage />}
      {activePage === 'Settings' && <SettingsPage />}
    </main>
  )
}

export default App
