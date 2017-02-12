/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();


function executeTrackerApiFetch() {
  // get parameters
  var token = 'd6a4af6ef3992f73a2b52dcf3e785b02',
    projectId = '1890249';

  // compose request URL
  var url = 'https://www.pivotaltracker.com/services/v5';
  url += '/projects/' + projectId;
  url += '/stories?filter=state:delivered,finished,rejected,started';
  url += ',unstarted,unscheduled';
  url += '&limit=20';

  // do API request to get story names
  $.ajax({
    url: url,
    beforeSend: function (xhr) {
      xhr.setRequestHeader('X-TrackerToken', token);
    }
  }).done(displayTrackerApiResponse);
}

function displayTrackerApiResponse(stories) {
  console.log(stories);
}
executeTrackerApiFetch();
t.render(function () {
  // this function we be called once on initial load
  // and then called each time something changes that
  // you might want to react to, such as new data being
  // stored with t.set()
});
