// Maps DHIS2 tracked entities (state.teiArray) -> OpenCRVS v2 birth notifications.
// Reference: https://github.com/opencrvs/event-notification-integration/blob/main/src/submit-test-notification.ts
//
// Demo simplifications (per OpenCRVS team):
// - Hardcoded office + hospital IDs from the Farajaland seed; stable through demo.
// - placeOfBirth fixed to HEALTH_FACILITY (PRIVATE_HOME/OTHER need full address integration).
// - informant.relation fixed to MOTHER (FATHER/GRANDFATHER variants require extra props).
// - informant.email hardcoded — DHIS2 program doesn't capture an email for this entity.

// Rather thank using...
// getLocations();
// and mapping to dhis2 clinics, we simply hardcode...

const HOSPITAL_ID = 'c36a0dad-c790-4824-aa62-6186deea5a4b'; // Ibombo District Hospital

fn(state => {
  const attr = (attributes, displayName) =>
    attributes?.find(a => a.displayName === displayName)?.value;

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

  // For testing, try a single declaration
  // return { ...state, declarations: declarations.slice(0, 1), trackingMap: {}, trackingPairs: [] };
  return { ...state, declarations, trackingMap: {}, trackingPairs: [] };
});