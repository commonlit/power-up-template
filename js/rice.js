/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var r = document.getElementById('r');
var i = document.getElementById('i');
var c = document.getElementById('c');
var e = document.getElementById('e');

t.render(function () {
  return Promise.all([
      t.get('card', 'shared', 'r'),
      t.get('card', 'shared', 'i'),
      t.get('card', 'shared', 'c'),
      t.get('card', 'shared', 'e')
    ])
    .spread(function (saved_r, saved_i, saved_c, saved_e) {
      r.value = saved_r;
      i.value = saved_i;
      c.value = saved_c;
      e.value = saved_e;
      console.log(r.value, i.value, saved_r, saved_i, saved_c, saved_e)
    })
    .then(function () {
      t.sizeTo('#content')
        .done();
    })
});

document.getElementById('save').addEventListener('click', function () {
  return t.set('card', 'shared', 'i', i.value)
    .then(function () {
      return t.set('card', 'shared', 'r', r.value);
    })
    .then(function () {
      return t.set('card', 'shared', 'c', c.value);
    })
    .then(function () {
      return t.set('card', 'shared', 'e', e.value);
    })
    .then(function () {
      t.closePopup();
    })
})
