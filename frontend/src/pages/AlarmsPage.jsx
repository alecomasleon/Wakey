import { useState } from 'react';
import Alarm from '../components/Alarm.jsx';

const ALARM_ARRAY = [
    {title: 'wakey', time: '16:30', days: ['Monday', 'Tuesday'], enabled: false},
    {title: 'wakeywakey', time: '8:24', days: ['Saturday', 'Sunday'], enabled: true},
    {title: 'WWWWWWWWWWWWW WWW', time: '8:24', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], enabled: true},
    {title: 'wakeywakey2', time: '8:24', days: ['Saturday', 'Sunday'], enabled: true},
    {title: 'wakeywakey3', time: '8:24', days: ['Saturday', 'Sunday'], enabled: true},
    {title: 'wakeywakey4', time: '8:24', days: ['Saturday', 'Sunday'], enabled: true},
    {title: 'wakeywakey5', time: '8:24', days: ['Saturday', 'Sunday'], enabled: true},
    {title: 'wakeywakey6', time: '8:24', days: ['Saturday', 'Sunday'], enabled: true},
    {title: 'wakeywakey7', time: '8:24', days: ['Saturday', 'Sunday'], enabled: true},
];

const AlarmsPage = ({}) => {
    const [alarms, setAlarms] = useState(ALARM_ARRAY);

    const handleToggleActive = (alarm) => {
        setAlarms(prev => {
            const alarmToSetIndex = prev.findIndex(e => e.title === alarm);
            var alarmToSet = prev[alarmToSetIndex];
            if(!alarmToSet) {console.log('invalid title'); return;}
            alarmToSet.enabled = !alarmToSet.enabled;

            const newArr = [...prev].filter(e => e.title !== alarm);
            newArr.splice(alarmToSetIndex, 0, alarmToSet);

            return newArr;
        })
    }

    return (
        <section className='bg-white rounded-lg bg-opacity-[0.025] h-full flex-[0.9] flex flex-col overflow-hidden w-full justify-center gap-2 items-center'>
            <ul
                className="
                    py-2 px-4
                    w-full h-full overflow-scroll gap-3
                    flex flex-col flex-[0.9]
                "
            >
                {
                    alarms.map(a => {
                        return (
                            <Alarm handleToggleActive={handleToggleActive} info={a} />
                        )
                    })
                }
            </ul>
            <div
                className="
                    flex-[0.075] flex justify-center items-center h-full aspect-square
                    bg-white text-lg 
                    rounded-lg border border-white border-solid
                "
            >
                +
            </div>
        </section>
    )
}

export default AlarmsPage;