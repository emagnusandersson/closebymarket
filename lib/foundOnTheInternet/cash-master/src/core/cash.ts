
// @require ./find.ts
// @require ./variables.ts

class Cash {

  constructor ( selector?: Selector, context: Context | Cash = doc ) {

    if ( !selector ) return;

    if ( isCash ( selector ) ) return selector;

    let eles: any = selector;

    if ( isString ( selector ) ) {

      const ctx = isCash ( context ) ? context[0] : context;

      eles = idRe.test ( selector )
                ? ( ctx as Document ).getElementById ( selector.slice ( 1 ) )
                : htmlRe.test ( selector )
                  ? parseHTML ( selector )
                  : find ( selector, ctx );

      if ( !eles ) return;

    } else if ( isFunction ( selector ) ) {

      return this.ready ( selector ); //FIXME: `fn.ready` is not included in `core`, but it's actually a core functionality

    }

    if ( eles.nodeType || eles === win ) eles = [eles];

    this.length = eles.length;

    for ( let i = 0, l = this.length; i < l; i++ ) {

      this[i] = eles[i];

    }

  }

  init ( selector?: Selector, context?: Context | Cash ) {

    return new Cash ( selector, context );

  }

}

const cash = Cash.prototype.init as typeof Cash.prototype.init & CashStatic;

cash.fn = cash.prototype = Cash.prototype; // Ensuring that `cash () instanceof cash`

Cash.prototype.length = 0;
Cash.prototype.splice = splice; // Ensuring a cash collection gets printed as array-like in Chrome
