
// @require core/cash.ts
// @require core/type_checking.ts
// @require core/variables.ts
// @require collection/each.ts
// @require ./helpers/parse_event_name.ts
// @require ./helpers/variables.ts

interface Cash {
  trigger ( event: string | Event, data? ): this;
}

Cash.prototype.trigger = function ( this: Cash, eventFullName: string | Event, data? ) {

  let evt: string | Event = eventFullName;

  if ( isString ( eventFullName ) ) {

    const [name, namespaces] = parseEventName ( eventFullName ),
          type = eventsMouseRe.test ( name ) ? 'MouseEvents' : 'HTMLEvents';

    evt = doc.createEvent ( type );
    evt.initEvent ( name, true, true );
    evt['namespace'] = namespaces.join ( eventsNamespacesSeparator );

  }

  evt['data'] = data;

  const isEventFocus = ( evt['type'] in eventsFocus );

  return this.each ( ( i, ele ) => {

    if ( isEventFocus && isFunction ( ele[evt['type']] ) ) {

      ele[evt['type']]();

    } else {

      ele.dispatchEvent ( evt );

    }

  });

};
