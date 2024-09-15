import { useState } from 'react';
import Alarm from '../components/Alarm.jsx';
import { ALARM_ARRAY } from '../alarm.js';
import ModifyAlarm from './ModifyAlarm.jsx';
import Drawer from '../components/Drawer.jsx';
import AlarmWrap from '../components/AlarmWrap.jsx';

const AlarmsPage = ({}) => {
    const [ open, setOpen ] = useState(false);
    const [ alarms, setAlarms ] = useState(ALARM_ARRAY);

    const handleToggleActive = (alarmId) => {
        setAlarms(prev => {
            const alarmToSetIndex = prev.findIndex(e => e.id === alarmId);
            // if(alarmToSetIndex === -1) return;
            var alarmToSet = [...prev][alarmToSetIndex];
            
            var newArr = [...prev];
            newArr[alarmToSetIndex] = {...alarmToSet, enabled: ![...prev][alarmToSetIndex].enabled};

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
                            <AlarmWrap handleToggleActive={() => handleToggleActive(a.id)} setAlarms={setAlarms} alarms={alarms} info={a} />
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
                onClick={() => setOpen(true)}
            >
                +
                <ModifyAlarm setAlarms={setAlarms} open={open} setOpen={setOpen}/>
            </div>
        </section>
    )
}

export default AlarmsPage;