/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

function executeTrackerApiFetch() {
  // get parameters
  var token = 'd6a4af6ef3992f73a2b52dcf3e785b02',
    projectId = '1890249';

  // compose request URL
  var url = 'https://www.pivotaltracker.com/services/v5';
  url += '/projects/' + projectId;
  url += '/stories?with_state=accepted'
  // url += '/stories?filter=state:delivered,finished,rejected,started';
  // url += ',unstarted,unscheduled';
  // url += '&limit=20';
  var myHeaders = new Headers({
    'X-TrackerToken': token
  });

  var myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
  };

  var myRequest = new Request(url, myInit);

  fetch(myRequest)
    .then(function (response) {
      return response.json()
        .then(function (json) {
          _.each(json, function (item) {
            console.log(item);
          })
        });
    })

  // do API request to get story names
  // $.ajax({
  //   url: url,
  //   beforeSend: function (xhr) {
  //     xhr.setRequestHeader('X-TrackerToken', token);
  //   }
  // }).done(displayTrackerApiResponse);
  if (self.fetch) {
    // run my fetch request here
  } else {
    console.log('no fetch');
  }
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
