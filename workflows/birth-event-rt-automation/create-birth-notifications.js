const OFFICE_ID = 'b9354086-d762-415d-9b8b-f004e2ff131e'; // Ibombo District Office

// Submit one notification per TEI. Each call is sequential (createEvent + notify).
// After each call, capture { teiId, trackingId } so we can later push the
// trackingId back to the DHIS2 TEI.
each($.declarations, async state => {
  const { teiId, payload } = state.data;
  const next = await submitBirthNotification(payload, {
    createdAtLocation: OFFICE_ID,
  })(state);
  const trackingId = next.data?.trackingId;
  next.trackingMap[teiId] = trackingId;
  next.trackingPairs.push({ teiId, trackingId });
  return next;
});