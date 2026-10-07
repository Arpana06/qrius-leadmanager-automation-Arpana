## Bugs in the application

### 1. Search by company does not work
- **Judgement:** The application has a bug
- I searched "HimalKart" (Sita Sharma's company). Expected 1 row, got 0.
- "Himal" also shows nothing.
- My test is fine. I checked by hand in the browser and saw the same thing.

### 2. Count text does not change after a search
- **Judgement:** The application has a bug
- After searching "Sita", 1 row is shown, but the text still says "Showing 12 of 12 leads".
- It should say "Showing 1 of 12 leads".

### 3. Adding a lead ignores the chosen status
- **Judgement:** The application has a bug
- I chose "Qualified" and saved, but the new row shows "New".
- Editing the status later works, so only the add form is broken.