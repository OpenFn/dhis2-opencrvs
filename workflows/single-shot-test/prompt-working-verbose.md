First, fetch TEIs from the new DHIS2 "tracker/trackedEntities" API using these filters:

orgUnits: DiszpKrYNg8
program: IpHINAT79UW
fields: :all
paging: false
updatedAfter: 24 hours ago (simple JS, inline)

---

Then, transform the array that's returned in `state.data.trackedEntities` using language-common.

Map each tracked entity into an OpenCRVS v2 birth notification payload and put the array on state.declarations. Use a a top-level constant HOSPITAL_ID = "c36a0dad-c790-4824-aa62-6186deea5a4b".

The payload keys are exactly 'child.name', 'child.gender', 'child.dob', 'child.placeOfBirth', 'child.birthLocation', 'informant.relation', 'informant.email', 'mother.detailsNotAvailable', 'mother.name'.
Define a helper attr(attrs, displayName) that returns attrs.find(a => a.displayName === displayName)?.value

For each TEI, set childAttrs = tei.attributes || [] and motherAttrs = tei.relationships?.[0]?.to?.trackedEntity?.attributes || [] before building the payload. 

Each declaration's payload should include:

child.name: { firstname, surname } pulled from childAttrs by displayName ("First name", "Last name")
child.gender: lowercased value of the "Gender" attribute
child.dob: tei.enrollments?.[0]?.occurredAt?.slice(0, 10) (use optional chaining)
child.placeOfBirth: "HEALTH_FACILITY" (hardcoded)
child.birthLocation: HOSPITAL_ID (Ibombo District Hospital)
informant.relation: "MOTHER"
informant.email: "test.informant@example.com"
mother.detailsNotAvailable: false
mother.name: { firstname, surname } from motherAttrs

---

Finally, create birth notifications in OpenCRVS using the v2 api.

Iterate $.declarations with each(...) and call submitBirthNotification(payload, { createdAtLocation: OFFICE_ID}) using another constant: OFFICE_ID = "b9354086-d762-415d-9b8b-f004e2ff131e".

--

Please skip the complex error handling/gold-plating we'd use for production. Keep it simple... it's just a demo.