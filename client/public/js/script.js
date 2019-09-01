// // create new trip
// alert("hello");
// var userId

$(document).ready(function () {
//   var selectedTrip;
  $(document).on('click', '#tripForm', handleTripFormSubmit);

  $('#tripDetails').on('click', handleAddDetailsForm);

  // $('.update-trip').on('click', function () {
  //   var updateId = $(this).attr('data-id');
  //   // alert(updateId);
  //   handleUpdateTripForm(updateId);
  // });

  function handleTripFormSubmit () {
    $('#submit').on('click', function (event) {
      event.preventDefault();

      var newTrip = {
        tripName: $('#firstName').val().trim(),
        startDate: $('#startDate').val().trim(),
        endDate: $('#endDate').val().trim(),
        userId: $('#user.id')
      };

      $.post('/api/trips', newTrip).then(function (res) {
        console.log(res);
      });
    });
  }

  // create flight/lodging/transport

  function handleAddDetailsForm () {
    var selectedTrip = $('.tripName').val();

    selectedTrip = parseInt(selectedTrip);

    var newFlight = {
      airline: $('input[name=airline]').val(),
      flightConNum: $('input[name=flightConNum]').val(),
      dateStartFly: $('input[name=dateStartFly]').val(),
      dateEndFly: $('input[name=dateEndFly]').val(),
      flightTime: $('input[name=flightTime]').val(),
      cancelledFly: false,
      flightNotes: $('input[name=flightNotes]').val(),
      TripId: selectedTrip
    };

    var newLodge = {
      lodgingName: $('input[name=lodgingName]').val(),
      lodgingConNum: $('input[name=lodgingConNum]').val(),
      dateStartLodg: $('input[name=dateStartLodg]').val(),
      dateEndLodg: $('input[name=dateEndLodg]').val(),
      checkIn: $('input[name=checkIn]').val(),
      cancelledLodg: false,
      lodgingNotes: $('input[name=lodgingNotes]').val(),
      TripId: selectedTrip

    };

    var newTrans = {
      dealer: $('input[name=dealer]').val(),
      carConNum: $('input[name=carConNum]').val(),
      dateStartTran: $('input[name=dateStartTran]').val(),
      dateEndTran: $('input[name=dateEndTran]').val(),
      tranTime: $('input[name=tranTime]').val(),
      cancelledTran: false,
      transportNotes: $('input[name=transportNotes]').val(),
      TripId: selectedTrip
    };

    // console.log(newFlight);
    $.post('/api/flights', newFlight).then(function (response) {
      console.log(response);
    });

    // console.log(newLodge);
    $.post('/api/lodgings', newLodge).then(function (response) {
      console.log(response);
    });

    // console.log(newTrans);
    $.post('/api/transports', newTrans).then(function (response) {
      console.log(response);
    });
    // console.log(newFlight);
  };
});

$(document).on('click', 'button.delete', handleTripDelete);
// $(document).on('click', 'button.edit', handleTripEdit);
// $(document).on('click', 'button.deleteFlight', handleFlightDelete);
// $(document).on('click', 'button.updateFlight', handleUpdateFlight);
// $(document).on('click', 'button.deleteLodging', handleLodgingDelete);
// $(document).on('click', 'button.updateLodging', handleUpdateLodging);
// $(document).on('click', 'button.deleteTransport', handleDeleteTransport);
// $(document).on('click', 'button.updateTransport', handleUpdateTransport);

function deleteTrip (id) {
  $.ajax({
    method: 'DELETE',
    url: '/api/trips/' + id
  })
    .then(function (response) {
      console.log(response);
    });
};

function handleTripDelete () {
  var currentTrip = $(this)
    .parent()
    .parent()
    .data('trip');
  deleteTrip(currentTrip.id);
}

// update trip
// function handleUpdateTripForm (updateId) {
//   var id = updateId
//   getTrips();
//   // alert('you are in the update' + updateId);
//   // $.put('/api/trips', updateTrip).then(function (response) {
//   $.ajax({
//     method: 'PUT',
//     url: '/api/trips',
//     data: trip
//   })
//     .then(function () {
//       window.location.href = '/allTrips';
//     });
// }

// var trips = [];
// // This function grabs todos from the database and updates the view
// function getTrips () {
//   $.get('/api/trips', function (data) {
//     trips = data;
//   });
// }

// // display trips
