import React, { useState } from 'react';
import './App.css';
import BusSeats from './components/BusSeats';

function App() {
  const [view, setView] = useState('dashboard');
  const [bookings, setBookings] = useState([]); 
  const [editingIndex, setEditingIndex] = useState(-1);

  const changeView = (newView) => {
    setView(newView);
  };

  const saveBookingDetails = (bookingDetails) => {
    setBookings([...bookings, bookingDetails]);
  };

  const editBookingDetails = (index, updatedDetails) => {
    const updatedBookings = [...bookings];
    updatedBookings[index] = updatedDetails;
    setBookings(updatedBookings);
    setEditingIndex(-1); 
  };

  const deleteReservation = (index) => {
    const updatedBookings = [...bookings];
    updatedBookings.splice(index, 1);
    setBookings(updatedBookings);
  };

  const enableEdit = (index) => {
    setEditingIndex(index);
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li><a href="#" onClick={() => changeView('dashboard')}>Dashboard</a></li>
          <li><a href="#" onClick={() => changeView('reservation')}>Reservation</a></li>
        </ul>
      </nav>

      <div className="container">
        {view === 'dashboard' && (
          <div className="dashboard">
            <h1>Dashboard</h1>
            {bookings.map((booking, index) => (
              <div key={index} className="booking-item">
                {editingIndex === index ? (
                  <>
                    <input type="text" value={booking.firstName} onChange={(e) => editBookingDetails(index, { ...booking, firstName: e.target.value })} />
                    <input type="text" value={booking.lastName} onChange={(e) => editBookingDetails(index, { ...booking, lastName: e.target.value })} />
                    <input type="text" value={booking.email} onChange={(e) => editBookingDetails(index, { ...booking, email: e.target.value })} />
                  </>
                ) : (
                  <>
                    <p>Name: {booking.firstName} {booking.lastName}</p>
                    <p>Email: {booking.email}</p>
                  </>
                )}
                <p>Seat Number: {booking.seat.id}</p>
                <p>Date of booking: {booking.bookingDate}</p>
                {editingIndex !== index ? (
                  <button onClick={() => enableEdit(index)}>Edit</button>
                ) : (
                  <button onClick={() => editBookingDetails(index, booking)}>Save</button>
                )}
                <button onClick={() => deleteReservation(index)}>Delete</button>
              </div>
            ))}
          </div>
        )}
        {view === 'reservation' && <div className="reservation"><BusSeats setBookingDetails={saveBookingDetails} /></div>}
      </div>
    </div>
  );
}

export default App;
