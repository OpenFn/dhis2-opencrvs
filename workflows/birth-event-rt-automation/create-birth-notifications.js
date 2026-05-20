const OFFICE_ID = 'b9354086-d762-415d-9b8b-f004e2ff131e'; // Ibombo District Office

each($.declarations, async state => {
  const { teiId, payload } = state.data;
  const next = await submitBirthNotification(payload, {
    createdAtLocation: OFFICE_ID,
  })(state);
  next.trackingMap[teiId] = next.data?.trackingId;
  return next;
});
