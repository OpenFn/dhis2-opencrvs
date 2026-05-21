Every few minutes, sync new birth events from DHIS2 to OpenCRVS as v2 birth notifications.

## 1. Pull from DHIS2

Using `@openfn/language-dhis2`, fetch tracked entities updated in the last 24 hours from:

- Org unit: `DiszpKrYNg8`
- Program: `IpHINAT79UW` (Child Programme)

## 2. Map to OpenCRVS birth notifications

For each tracked entity, build one OpenCRVS v2 birth notification.

- `child.name.firstname` ← DHIS2 attribute "First name" on the child
- `child.name.surname` ← DHIS2 attribute "Last name" on the child
- `child.gender` ← DHIS2 attribute "Gender" on the child (lowercased)
- `child.dob` ← program enrollment date (YYYY-MM-DD)
- `child.placeOfBirth` ← `HEALTH_FACILITY`
- `child.birthLocation` ← `HOSPITAL_ID` (Ibombo District Hospital)
- `informant.relation` ← `MOTHER`
- `informant.email` ← `test.informant@example.com`
- `mother.detailsNotAvailable` ← `false`
- `mother.name.firstname` ← DHIS2 attribute "First name" on the mother
- `mother.name.surname` ← DHIS2 attribute "Last name" on the mother

The **mother** is the related tracked entity linked to the child via its first relationship.

Constants:
- `HOSPITAL_ID = "c36a0dad-c790-4824-aa62-6186deea5a4b"`
- `OFFICE_ID   = "b9354086-d762-415d-9b8b-f004e2ff131e"` (Ibombo District Office)

## 3. Submit to OpenCRVS

Using `@openfn/language-opencrvs`, submit each mapped declaration as a birth notification attributed to `OFFICE_ID`.

---

Demo only — skip production-grade error handling.
