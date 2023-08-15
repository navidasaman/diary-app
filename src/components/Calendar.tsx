import React, { useState } from 'react';
import '../css/Calendar.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';

function Calendar() {
  // State variable to hold events
  const [events, setEvents] = useState<EventInput[]>([]); 
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupDescription, setPopupDescription] = useState('');
  const [popupStartDate, setPopupStartDate] = useState('');
  const [popupEndDate, setPopupEndDate] = useState('');
  const [editEventId, setEditEventId] = useState('');

  // To select date in calendar which is extracted from the arg and stored into the state variabales
  const handleDateSelect = (arg: any) => {
    setPopupStartDate(arg.startStr); 
    setPopupEndDate(arg.endStr);
    setShowPopup(true);
  };

  // function handleEventClick which fires as a slot in the calendar is pressed
  const handleEventClick = (arg: any) => {
    const event = arg.event; // the click event object is extracted from the arg object which contains the properties in the line below
    const { id, title, start, end, extendedProps } = event; // extracts the following properties from the event object
    // state setter functions to set the state of the variables
    setPopupTitle(title);
    setPopupStartDate(start.toISOString());
    setPopupEndDate(end.toISOString());
    setPopupDescription(extendedProps.description || '');
    setEditEventId(id);
    setShowPopup(true);
  };

  // function which handles the input to submit the edited or newly created event
  const handlePopupSubmit = () => {
    // for the code to be submitted the fields must be entered appropriatly
    if (popupTitle && popupStartDate && popupEndDate) {
      // Creates an event with the following properties:
      const newEvent: EventInput = {
        id: editEventId || new Date().toISOString(),
        title: popupTitle,
        start: popupStartDate,
        end: popupEndDate,
        allDay: false,
        extendedProps: {
          description: popupDescription,
        },
      };
      
      // To update event if it is being edited otherwise set the new event
      if (editEventId) {
        const updatedEvents = events.map((event) => {
          if (event.id === editEventId) {
            return { ...event, ...newEvent };
          }
          return event;
        });
        setEvents(updatedEvents);
        setEditEventId('');
      } else {
        setEvents([...events, newEvent]);
      }
      setShowPopup(false);
      setPopupTitle('');
      setPopupDescription('');
      setPopupStartDate('');
      setPopupEndDate('');
    }
  };

  // to be able to delete event
  const handleEventDelete = () => {
    const updatedEvents = events.filter((event) => event.id !== editEventId); // if the event id does not match with the edited event id it will be filtered out
    setEvents(updatedEvents); // the events are updated with the filtered array above
    // the state variables are reset
    setShowPopup(false);
    setPopupTitle('');
    setPopupDescription('');
    setPopupStartDate('');
    setPopupEndDate('');
    setEditEventId('');
  };

 return (
    <div className='calendar'>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true} // will let the user select time and date
        editable={true} // will let user drag and resize events
        dayMaxEvents={true} // limits number of max events shown in one day
        events={events}
        select={handleDateSelect} 
        eventClick={handleEventClick}
        eventContent={(arg) => (
          <div className='single-day-event'>
              <div className='dot'></div>
              <div className='title2'>{arg.event.title}</div>
          </div>
        )}
        // shows what the header will contain
        headerToolbar={{
          start: 'dayGridMonth, timeGridWeek, timeGridDay', 
          center: 'title',
          end: 'today prev,next', 
        }}
        height={'88.6vh'}
      />
      
      {/* Showcases the popup with its properties */}
      {showPopup && (
        <div className="popup">
          <h1>Information.</h1>
          <div>
            <input
              type="text"
              value={popupTitle}
              onChange={(e) => setPopupTitle(e.target.value)}
              placeholder="Event"
            />
            <textarea
              style={{ height: '80px' }}
              value={popupDescription}
              onChange={(e) => setPopupDescription(e.target.value)}
              placeholder="Description"
            />
            <label>Start Date:</label>
            <input
              type="datetime-local"
              value={popupStartDate}
              onChange={(e) => setPopupStartDate(e.target.value)}
            />
            <label>End Date:</label>
            <input
              type="datetime-local"
              value={popupEndDate}
              onChange={(e) => setPopupEndDate(e.target.value)}
            />
            <button onClick={handlePopupSubmit}>
              {editEventId ? 'Update Event' : 'Add Event'}
            </button>
            {editEventId && (
              <button onClick={handleEventDelete}>Delete Event</button>
            )}
            <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
      <button className='addEventsButton' onClick={handleDateSelect} >
              {editEventId ? 'Update Event' : 'Add Event'}
      </button>
    </div>

  );
}

export default Calendar;