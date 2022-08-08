# TaxuallyFrontEnd

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

This project was created to create new user who can login to the site and then be able to store and delete files.
For the store I used localStorage so 5MB is the maximum what you can upload(it can be 10MB depend on your browser support)

For the files there is no option the preview it or download them.

The files are converted to Base64 format to store it in the database(in this case localStorage).

The files is sortable and filterable.

To remove the users from the localStorage you have to clear the cache.
