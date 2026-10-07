# Findings
## Failed tests

### Test 1: Searching by a company name narrows the list
- Result:** Failed
- Judgement: The application has a bug
- Reasoning: Searching "HimalKart", a company that exists in the data, shows no rows, so the search ignores the company field.
### Details
- Test: `search.spec.ts` › searching by company narrows the list
- Expected: Searching "HimalKart" shows 1 row, Sita Sharma.
- Actual: 0 rows. I also typed "Himal" by hand and got 0 rows, so even part of a company name finds nothing.
- Why not my test: "HimalKart" is Sita Sharma's company in the seeded data. The assignment says searching by company should narrow the list. My locators and checks are correct. I also tried it by hand in the browser and saw the same thing.
- Judgement: The application has a bug.

### Test 2: Count text reflects how many leads are shown after a search
- Result: Failed
- Judgement: The application has a bug
- Reasoning: After a search leaves 1 row, the count text still shows the full total instead of the number shown.

### Details
- Test: `search.spec.ts` › count text reflects the number of leads shown
- Expected: "Showing 1 of 12 leads" after searching "Sita".
- Actual: "Showing 12 of 12 leads" while only 1 row is visible.
- Why not my test: The check `toHaveCount(1)` passes just before it, so the list did get smaller. Only the count text is wrong. The assignment says the count should match how many leads are shown.
- Judgement: The application has a bug.