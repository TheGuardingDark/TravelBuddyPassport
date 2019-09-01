

INSERT INTO users (userName, userId, email, createdAt, updatedAt) VALUES ("Sam Vimes", "1313", "myemail@hmail.com", "0000-00-00 00:00:00", "0000-00-00 00:00:00");

INSERT INTO trips (tripName, startDate, endDate, tripNotes, createdAt, updatedAt, UserId) VALUES ("Ankh Morpork Trip", "0000-00-00 00:00:00", "0000-00-00 00:00:00", "Bring Luggage", "0000-00-00 00:00:00", "0000-00-00 00:00:00", 1);

INSERT INTO lodgings (lodgingName, lodgingConNum, dateStartLodg, dateEndLodg, checkIn, lodgingNotes, createdAt, updatedAt, TripId) VALUES ("Best Western", 1325, "0000-00-00", "0000-00-00", "15:30:00", "Bring Snacks", "0000-00-00 00:00:00", "0000-00-00 00:00:00", 1);

INSERT INTO flights (airline, flightConNum, dateStartFly, dateEndFly, flightTime, flightNotes, createdAt, updatedAt, TripId) VALUES ("United", 1313, 03/11/2020, 03/16/2020, "12:30", "Must get back to work.", "0000-00-00 00:00:00", "0000-00-00 00:00:00", 1);

INSERT INTO transports (dealer, carConNum, dateStartTran, dateEndTran, tranTime, transportNotes, createdAt, updatedAt, TripId) VALUES ("Hertz", 14875, "0000-00-00", "0000-00-00", "1:15", "Get Gas", "0000-00-00 00:00:00", "0000-00-00 00:00:00", 1);
