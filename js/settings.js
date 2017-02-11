/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var r = document.getElementById('r');
var i = document.getElementById('i');
var c = document.getElementById('c');
var e = document.getElementById('e');

t.render(function () {
  return Promise.all([
      t.get('board', 'shared', 'r'),
      t.get('board', 'shared', 'i'),
      t.get('board', 'shared', 'c'),
      t.get('board', 'shared', 'e')
    ])
    // .spread(function (savedFruit, savedVegetable) {
    //   if (savedFruit && /[a-z]+/.test(savedFruit)) {
    //     r.value = savedFruit;
    //   }
    //   if (savedVegetable && /[a-z]+/.test(savedVegetable)) {
    //     i.value = savedVegetable;
    //   }
    // })
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
