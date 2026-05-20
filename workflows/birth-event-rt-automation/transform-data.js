// Maps DHIS2 tracked entities -> OpenCRVS v2 birth notifications.
// Demo simplifications: hardcoded hospital + informant, MOTHER relationship,
// placeOfBirth fixed to HEALTH_FACILITY.

const HOSPITAL_ID = 'c36a0dad-c790-4824-aa62-6186deea5a4b'; // Ibombo District Hospital

fn(state => {
  const attr = (attrs, displayName) =>
    attrs?.find(a => a.displayName === displayName)?.value;

  const declarations = state.data.trackedEntities.map(tei => {
    const childAttrs = tei.attributes;
    const motherAttrs = tei.relationships?.[0]?.to?.trackedEntity?.attributes;

    return {
      teiId: tei.trackedEntity,
      payload: {
        'child.name': {
          firstname: attr(childAttrs, 'First name'),
          surname: attr(childAttrs, 'Last name'),
        },
        'child.gender': (attr(childAttrs, 'Gender') || '').toLowerCase(),
        'child.dob': tei.enrollments?.[0]?.occurredAt?.slice(0, 10),
        'child.placeOfBirth': 'HEALTH_FACILITY',
        'child.birthLocation': HOSPITAL_ID,
        'informant.relation': 'MOTHER',
        'informant.email': 'test.informant@example.com',
        'mother.detailsNotAvailable': false,
        'mother.name': {
          firstname: attr(motherAttrs, 'First name'),
          surname: attr(motherAttrs, 'Last name'),
        },
      },
    };
  });

  return { ...state, declarations, trackingMap: {} };
});
