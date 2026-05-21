const OFFICE_ID = "b9354086-d762-415d-9b8b-f004e2ff131e";

each(
  "$.declarations[*]",
  submitBirthNotification(state => state.data, { createdAtLocation: OFFICE_ID })
);