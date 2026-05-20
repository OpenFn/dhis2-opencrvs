fn(async state => {
  const { trackingMap, cursor } = state;

  for (const [teiId, birthCertValue] of Object.entries(trackingMap)) {
    // Fetch TEI with enrollments and events
    state = await get(`/tracker/trackedEntities/${teiId}`, {
      params: { fields: 'enrollments[events[*]]' }
    })(state);

    const trackedEntity = state.data;
    const previousEvent = trackedEntity.enrollments?.[0]?.events?.find(
      e => e.programStage === 'A03MvHHogjR'
    );

    if (!previousEvent) {
      console.log(`No birth event found for TEI: ${teiId}, skipping.`);
      continue;
    }

    const updatedEvent = {
      ...previousEvent,
      dataElements: [{ dataElement: 'uf3svrmp8Oj', value: birthCertValue }]
    };

    state = await post(
      '/tracker',
      { events: [updatedEvent] },
      { params: { async: 'false', importStrategy: 'UPDATE' } }
    )(state);

    console.log(`Updated birth certificate for TEI: ${teiId}`);
  }

  return { cursor };
});