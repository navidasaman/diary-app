import React, { useState, useEffect } from 'react';
import '../css/Calendar.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';
import axios from 'axios';

function Calendar() {
  // State variable to hold events
  const [events, setEvents] = useState<EventInput[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [title, setPopupTitle] = useState('');
  const [description, setPopupDescription] = useState('');
  const [start, setPopupStartDate] = useState('');
  const [end, setPopupEndDate] = useState('');
  const [editEventId, setEditEventId] = useState('');
  const [eventId, setEventId] = useState('');

  // To refresh window
  const handleRefresh = () => {
    window.location.reload();
  }

  useEffect(() => {
    axios.get('[sensitive data, edited out]')
      .then((response) => {
        setEvents(response.data);
        console.log(response.data);
      });
  }, []); // don't forget that useEffect hooks runs after each render! therefore an emty dependency array must be added []! 

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
    setPopupDescription(extendedProps.description || '');
    setPopupStartDate(start ? start.toLocaleString() : '');
    setPopupEndDate(end ? end.toLocaleString() : '');
    setEditEventId(id);
    setShowPopup(true);
    setEventId(new Date().toISOString());
  };

  // function which handles the input to submit the edited or newly created event
  const handlePopupSubmit = () => {
    // for the code to be submitted, the fields must be entered appropriately 
    if (title && start && end) {
      // Creates an event with the following properties 
      const newEvent = {
        id: editEventId || eventId,
        title: title,
        start: start,
        end: end,
        allDay: false,
        extendedProps: {
          description: description
        }
      };
      // To update event if it is being edited, otherwise set the new event 
      if (editEventId) {
        axios.put(`[sensitive data, edited out]`, newEvent)
          .then(() => {
            console.log('Event updated successfully');

            // Update the events state with the updated event
            const updatedEvents = events.map((event) => {
              if (event.id === editEventId) {
                return { ...event, ...newEvent };
              }
              return event;
            });
            setEvents(updatedEvents);
            setEditEventId('');
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        // Make an API call to store the event in the database
        axios.post('[sensitive data, edited out]', newEvent)
          .then((request) => {
            console.log('Event added successfully');
            // Update the events state with the new event
            setEvents([...events, newEvent]);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
    setShowPopup(false);
  };

  // to be able to delete event
  const handleEventDelete = () => {
    const eID = editEventId || eventId;
    const updatedEvents = events.filter((event) => event.id !== eID);
    axios.delete(`[sensitive data, edited out]`)
      .then((response) => {
        console.log('Event deleted successfully');
        setEvents(updatedEvents); // Update the events state with updatedEvents
        // Reset the state variables
        setShowPopup(false);
        setPopupTitle('');
        setPopupDescription('');
        setPopupStartDate('');
        setPopupEndDate('');
        setEditEventId('');
        setEvents(updatedEvents);
        console.error(response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
    handleRefresh();
  };

  return (
    <form className='calendar' onSubmit={handlePopupSubmit}>
      <div className='calendarUI'>
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
        <button className='addEventsButton' onClick={handleDateSelect} >
          {editEventId ? 'Update Event' : 'Add Event'}
        </button>
      </div>
      {/* Showcases the popup with its properties */}
      {showPopup && (
        <div className="popup">
          <h1 className="calendarTitle">Information.</h1>
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setPopupTitle(e.target.value)}
              placeholder="Event"
            />
            <textarea
              style={{ height: '80px' }}
              value={description}
              onChange={(e) => setPopupDescription(e.target.value)}
              placeholder="Description"
            />
            <label className='datePicker'>Start Date:</label>
            <input 
              type="datetime-local"
              value={start}
              onChange={(e) => setPopupStartDate(e.target.value)}
            />
            <label className='datePicker'>End Date:</label>
            <input 
              type="datetime-local"
              value={end}
              onChange={(e) => setPopupEndDate(e.target.value)}
            />
            <button>
              {editEventId ? 'Update Event' : 'Add Event'}
            </button>
            {(editEventId || eventId) && (
              <button onClick={handleEventDelete}>Delete Event</button>
            )}
            <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </form>

  );
}

export default Calendar;