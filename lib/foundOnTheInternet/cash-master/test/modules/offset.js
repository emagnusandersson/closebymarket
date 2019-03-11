
var fixture = '\
  <div class="relative" style="position: relative">\
    <div class="fixed" style="position: fixed; top: 200px; left: 100px;"></div>\
    <div class="absolute" style="position: absolute; top: 20px; left: 10px;"></div>\
  </div>\
';

describe ( 'Offset', { beforeEach: getFixtureInit ( fixture ) }, function () {

  describe ( '$.fn.offsetParent', function ( it ) {

    it ( 'gets the offset parent', function ( t ) {

      var relative = $('.relative');
      var absolute = $('.absolute');

      t.deepEqual ( absolute.offsetParent (), relative );

    });

  });

  describe ( '$.fn.offset', function ( it ) {

    it ( 'gets the offset', function ( t ) {

      var fixed = $('.fixed');

      t.deepEqual ( fixed.offset (), { top: 200, left: 100 } );

    });

  });

  describe ( '$.fn.position', function ( it ) {

    it ( 'gets the offset', function ( t ) {

      var absolute = $('.absolute');

      t.deepEqual ( absolute.position (), { top: 20, left: 10 } );

    });

  });

});
