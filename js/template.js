var WHITE_ICON = './images/icon-white.svg';
var GRAY_ICON = './images/icon-gray.svg';

var parkMap = {
  acad: 'Acadia National Park',
  arch: 'Arches National Park',
  badl: 'Badlands National Park',
  brca: 'Bryce Canyon National Park',
  crla: 'Crater Lake National Park',
  dena: 'Denali National Park',
  glac: 'Glacier National Park',
  grca: 'Grand Canyon National Park',
  grte: 'Grand Teton National Park',
  olym: 'Olympic National Park',
  yell: 'Yellowstone National Park',
  yose: 'Yosemite National Park',
  zion: 'Zion National Park'
};

var getBadges = function (t) {
  return Promise.all([
    t.get('card', 'shared', 'r'),
    t.get('card', 'shared', 'i'),
    t.get('card', 'shared', 'c'),
    t.get('card', 'shared', 'e')
  ]).then(function (data) {
    // console.log(r, 'multiple2');
    return [{
      title: 'Reach', // for detail badges only
      text: data[0]
    }, {
      title: 'Impact', // for detail badges only
      text: data[1]
    }, {
      title: 'Confidence', // for detail badges only
      text: data[2]
    }, {
      title: 'Effort', // for detail badges only
      text: data[3]
    }, {
      title: 'Score', // for detail badges only
      text: (data[0] + data[1] + data[2]) / data[3]
    }];

  });
};

var formatNPSUrl = function (t, url) {
  if (!/^https?:\/\/www\.nps\.gov\/[a-z]{4}\//.test(url)) {
    return null;
  }
  var parkShort = /^https?:\/\/www\.nps\.gov\/([a-z]{4})\//.exec(url)[1];
  if (parkShort && parkMap[parkShort]) {
    return parkMap[parkShort];
  } else {
    return null;
  }
};

var boardButtonCallback = function (t) {
  return t.popup({
    title: 'Popup List Example',
    items: [{
        text: 'Open Overlay',
        callback: function (t) {
          return t.overlay({
              url: './overlay.html',
              args: {
                rand: (Math.random() * 100).toFixed(0)
              }
            })
            .then(function () {
              return t.closePopup();
            });
        }
      },
      {
        text: 'Open RICE Board',
        callback: function (t) {
          return t.boardBar({
              url: './board-bar.html',
              height: 200
            })
            .then(function () {
              return t.closePopup();
            });
        }
      }
    ]
  });
};

var estRICE = function (t) {
  return t.popup({
    title: 'Estimate RICE',
    url: './rice.html'
  });
};

TrelloPowerUp.initialize({
  'attachment-sections': function (t, options) {
    // options.entries is a list of the attachments for this card
    // you can look through them and 'claim' any that you want to
    // include in your section.

    // we will just claim urls for Yellowstone
    var claimed = options.entries.filter(function (attachment) {
      return attachment.url.indexOf('http://www.nps.gov/yell/') === 0;
    });

    // you can have more than one attachment section on a card
    // you can group items together into one section, have a section
    // per attachment, or anything in between.
    if (claimed && claimed.length > 0) {
      // if the title for your section requires a network call or other
      // potentially length operation you can provide a function for the title
      // that returns the section title. If you do so, provide a unique id for
      // your section
      return [{
        id: 'Yellowstone', // optional if you aren't using a function for the title
        claimed: claimed,
        icon: GRAY_ICON,
        title: 'Example Attachment Section: Yellowstone',
        content: {
          type: 'iframe',
          url: t.signUrl('./section.html', {
            arg: 'you can pass your section args here'
          }),
          height: 230
        }
      }];
    } else {
      return [];
    }
  },
  'attachment-thumbnail': function (t, options) {
    var parkName = formatNPSUrl(t, options.url);
    if (parkName) {
      // return an object with some or all of these properties:
      // url, title, image, openText, modified (Date), created (Date), createdBy, modifiedBy
      return {
        url: options.url,
        title: parkName,
        image: {
          url: './images/nps.svg',
          logo: true // false if you are using a thumbnail of the content
        },
        openText: 'Open in NPS'
      };
    } else {
      throw t.NotHandled();
    }
  },
  'board-buttons': function (t, options) {
    return [{
      icon: WHITE_ICON,
      text: 'RICE Est.',
      callback: boardButtonCallback
    }];
  },
  'card-badges': function (t, options) {
    return getBadges(t);
  },
  'card-buttons': function (t, options) {
    return [{
      icon: GRAY_ICON,
      text: 'RICE Est.',
      callback: estRICE
    }];
  },
  'card-detail-badges': function (t, options) {
    return getBadges(t);
  },
  'card-from-url': function (t, options) {
    var parkName = formatNPSUrl(t, options.url);
    if (parkName) {
      return {
        name: parkName,
        desc: 'An awesome park: ' + options.url
      };
    } else {
      throw t.NotHandled();
    }
  },
  'format-url': function (t, options) {
    var parkName = formatNPSUrl(t, options.url);
    if (parkName) {
      return {
        icon: GRAY_ICON,
        text: parkName
      };
    } else {
      throw t.NotHandled();
    }
  },
  'show-settings': function (t, options) {
    return t.popup({
      title: 'Settings',
      url: './settings.html',
      height: 184
    });
  }
});
