# Connect-Mailerlite-to-Google-Sheets-to-sync-subscribers
A free script to Connect Mailerlite to Google Sheets to sync subscribers

## Setup Steps – MailerLite to Google Sheets Sync

### Step 1: Get Your MailerLite API Key
- Go to https://dashboard.mailerlite.com/integrations/api
- Copy your API key
- **Copy your API key and save it in a text file on your local computer (do not share this key with anyone).**

### Step 2: Create Your Google Sheet
- Open Google Sheets and create a new sheet
- Add these column headers:  
  **Email | Name | Signup Date**

### Step 3: Open Apps Script
- In your Google Sheet, click **Extensions → Apps Script**

### Step 4: Create the Config File
- Click the **+** button next to **Files**
- Name the file **Config.gs**
- **Paste the Config code from the `Config.gs` file in the GitHub repository**
- **Replace `YOUR_API_KEY_HERE` with your actual API key (from Step 1)**
- Click **Save**

### Step 5: Create the Code File
- Click the **+** button again
- Name the file **Code.gs**
- Paste the code from the `Code.gs` file in the GitHub repository
- Click **Save**

### Step 6: Run the First Sync
- At the top, select **syncMailerLiteToSheets** from the dropdown
- Click **Run**
- When prompted:
  - Click **Review Permissions**
  - Choose your Google account
  - Click **Allow**

### Step 7: Check Your Google Sheet for Imported Subscribers
- Return to your Google Sheet
- You should see your MailerLite subscribers listed in the sheet

### Step 8: Set Up Automatic Sync
- Select **createDailyTrigger** from the dropdown
- Click **Run**
- ✅ Done! The sheet will now sync automatically every 48 hours
