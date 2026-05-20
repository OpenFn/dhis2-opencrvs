fn(state => {
  const cursor = state.cursor || new Date().toISOString()
  return { ...state, cursor }
});

get('tracker/trackedEntities', {
  orgUnits: 'DiszpKrYNg8',
  program: 'IpHINAT79UW',
  fields: ':all',
  paging: false,
  // updatedAfter: $.cursor
});