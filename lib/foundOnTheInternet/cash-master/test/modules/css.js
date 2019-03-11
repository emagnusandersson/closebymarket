
var fixture = '\
  <div class="css" style="height: 50px; position: static;"></div>\
';

describe ( 'CSS', { beforeEach: getFixtureInit ( fixture ) }, function () {

  describe ( '$.fn.css', function ( it ) {

    it ( 'gets the value of a property', function ( t ) {

      var ele = $('.css');

      t.is ( ele.css ( 'height' ), '50px' );
      t.is ( ele.css ( 'position' ), 'static' );

    });

    it ( 'sets the value of a property', function ( t ) {

      var ele = $('.css');

      ele.css ( 'height', '100px' );

      t.is ( ele.css ( 'height' ), '100px' );

    });

    it ( 'supports setting an object of properties', function ( t ) {

      var ele = $('.css');
      var props = { height: '100px', width: '100px' };

      ele.css ( props );

      t.is ( ele.css ( 'width' ), '100px' );
      t.is ( ele.css ( 'height' ), '100px' );

    });

    if ( Supports.CSSvariables ) {

      it ( 'supports custom variables', function ( t ) {

        var ele = $('.css');

        t.is ( ele.css ( '--foo' ), undefined );
        t.is ( ele.css ( '--bar' ), undefined );

        ele.css ( '--foo', 0 );
        ele.css ( '--bar', 'content' );

        t.is ( ele.css ( '--foo' ), '0' );
        t.is ( ele.css ( '--bar' ), 'content' );

      });

    }

    it ( 'supports invalid properties', function ( t ) {

      var ele = $('.css');

      t.is ( ele.css ( 'foo' ), undefined );

      ele.css ( 'foo', 123 );

      t.is ( ele.css ( 'foo' ), undefined );

    });

  });

});
