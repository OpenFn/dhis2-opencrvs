const BIRTH_EVENT_PROGRAM_STAGE = 'A03MvHHogjR';
const TRACKING_ID_DATA_ELEMENT = 'uf3svrmp8Oj';

fn(async state => {
  for (const [teiId, trackingId] of Object.entries(state.trackingMap)) {
    state = await get(`tracker/trackedEntities/${teiId}`, {
      fields: 'enrollments[events[*]]',
    })(state);

    const event = state.data.enrollments?.[0]?.events?.find(
      e => e.programStage === BIRTH_EVENT_PROGRAM_STAGE
    );
    if (!event) {
      console.log(`No birth event found for TEI ${teiId}, skipping.`);
      continue;
    }

    state = await http.post(
      'tracker',
      {
        events: [
          {
            ...event,
            dataValues: [
              { dataElement: TRACKING_ID_DATA_ELEMENT, value: trackingId },
            ],
          },
        ],
      },
      { params: { async: 'false', importStrategy: 'UPDATE' } }
    )(state);

    console.log(`Set tracking ID "${trackingId}" for TEI ${teiId} - status: ${state.data?.status}`);
  }

  return { cursor: state.runStartedAt };
});
