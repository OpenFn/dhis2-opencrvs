fn(state => {
  state.runStartedAt = new Date().toISOString();
  state.cursorIn =
    state.cursor || new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  return state;
});

get('tracker/trackedEntities', {
  orgUnits: 'DiszpKrYNg8',
  program: 'IpHINAT79UW',
  fields: ':all',
  paging: false,
  updatedAfter: $.cursorIn,
});
