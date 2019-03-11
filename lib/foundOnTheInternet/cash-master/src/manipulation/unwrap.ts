
// @require core/cash.ts

interface Cash {
  unwrap (): this;
}

Cash.prototype.unwrap = function ( this: Cash ) {

  this.parent ().each ( ( i, ele ) => {

    const $ele = cash ( ele );

    $ele.replaceWith ( $ele.children () );

  });

  return this;

};
