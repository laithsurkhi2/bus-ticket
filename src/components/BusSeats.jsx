import React, { useState } from 'react';
import './BusSeats.css';

const BusSeats = ( {setBookingDetails}) => {
  const [seats, setSeats] = useState([
    // Lower deck
    { id: 1, available: true, deck: 'lower', row: 1, col: 1 },
    { id: 2, available: false, deck: 'lower', row: 2, col: 1 },
    { id: 3, available: true, deck: 'lower', row: 1, col: 2 },
    { id: 4, available: true, deck: 'lower', row: 2, col: 2 },
    { id: 5, available: false, deck: 'lower', row: 1, col: 3 },
    { id: 6, available: true, deck: 'lower', row: 2, col: 3 },
    { id: 7, available: false, deck: 'lower', row: 7, col: 1 },
    { id: 8, available: false, deck: 'lower', row: 7, col: 2 },
    { id: 9, available: true, deck: 'lower', row: 7, col: 3 },
    { id: 10, available: true, deck: 'lower', row: 1, col: 4 },
    { id: 11, available: false, deck: 'lower', row: 2, col: 4 },
    { id: 12, available: true, deck: 'lower', row: 7, col: 4 },
    { id: 13, available: true, deck: 'lower', row: 1, col: 5 },
    { id: 14, available: false, deck: 'lower', row: 2, col: 5 },
    { id: 15, available: true, deck: 'lower', row: 7, col: 5 },
    // Upper deck
    { id: 16, available: true, deck: 'upper', row: 1, col: 1 },
    { id: 17, available: false, deck: 'upper', row: 2, col: 1 },
    { id: 18, available: true, deck: 'upper', row: 1, col: 2 },
    { id: 19, available: true, deck: 'upper', row: 2, col: 2 },
    { id: 20, available: false, deck: 'upper', row: 1, col: 3 },
    { id: 21, available: true, deck: 'upper', row: 2, col: 3 },
    { id: 22, available: false, deck: 'upper', row: 7, col: 1 },
    { id: 23, available: true, deck: 'upper', row: 7, col: 2 },
    { id: 24, available: false, deck: 'upper', row: 7, col: 3 },
    { id: 25, available: true, deck: 'upper', row: 1, col: 4 },
    { id: 26, available: true, deck: 'upper', row: 2, col: 4 },
    { id: 27, available: false, deck: 'upper', row: 7, col: 4 },
    { id: 28, available: true, deck: 'upper', row: 1, col: 5 },
    { id: 29, available: true, deck: 'upper', row: 2, col: 5 },
    { id: 30, available: false, deck: 'upper', row: 7, col: 5 },
  ]);

  const [selectedSeat, setSelectedSeat] = useState(null);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [showForm, setShowForm] = useState(false);

  const handleSeatClick = (seat) => {
    if (seat.available) {
      setSelectedSeat(seat);
      setShowForm(true);
    }
    else {
        alert('Seat not available');
      }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!userInfo.firstName || !userInfo.lastName || !userInfo.email) {
        alert('Please fill in all fields');
        return;
      }
    setBookingDetails({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      seat: selectedSeat,
      bookingDate: new Date().toLocaleDateString(),
    });
    setShowForm(false);
  };

  return (
    <div className="bus-booking">
      <div className="decks-wrapper">
        <div className="deck-container">
          <h2>Lower Deck</h2>
          <div className="deck lower-deck">
            <div className="seats-container">
              {seats
                .filter((seat) => seat.deck === 'lower')
                .map((seat) => (
                  <div
                    key={seat.id}
                    className={`seat ${seat.available ? 'available' : 'unavailable'}`}
                    style={{ gridColumn: seat.col, gridRow: seat.row }}
                    onClick={() => handleSeatClick(seat)}
                  >
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="deck-container">
          <h2>Upper Deck</h2>
          <div className="deck upper-deck">
            <div className="seats-container">
              {seats
                .filter((seat) => seat.deck === 'upper')
                .map((seat) => (
                  <div
                    key={seat.id}
                    className={`seat ${seat.available ? 'available' : 'unavailable'}`}
                    style={{ gridColumn: seat.col, gridRow: seat.row }}
                    onClick={() => handleSeatClick(seat)}
                  >
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {showForm && (
        <div className="semi-form-popup">
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="First Name"
              value={userInfo.firstName}
              onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={userInfo.lastName}
              onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BusSeats;
