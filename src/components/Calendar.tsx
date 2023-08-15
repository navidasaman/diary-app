import '../css/Calendar.css'
import Fullcalendar  from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

function Calendar() {
  return (
    <div className="calendar">
      <Fullcalendar 
        plugins ={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: 'dayGridMonth, timeGridWeek, timeGridDay',
          center: 'title',
          end: 'today prev,next', 
        }}
        height={'90vh'}       
      />
    </div>
  )
}

export default Calendar
