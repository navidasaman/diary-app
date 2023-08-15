import React, { useState } from 'react';
import '../css/Calendar.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';

function Calendar() {
  
  return (
    <div className='calendar'>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true} // will let the user select time and date
        editable={true} // will let user drag and resize events
        dayMaxEvents={true} // limits number of max events shown in one day
        navLinks={true} // will enable switching between the views day/week/month
        // shows what the header will contain
        headerToolbar={{
          start: 'dayGridMonth, timeGridWeek, timeGridDay', 
          center: 'title',
          end: 'today prev,next', 
        }}
        height={'84vh'}
      />
    </div>

  );
}

export default Calendar;