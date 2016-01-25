Demo TODO:
 - [DONE] Render a pretty chart
 - [DONE] Hot reloading of styles
 - [DONE] Display multiple charts arranged in a 2x2 grid
 - [DONE] Import MDL Lite
 - Demo what happens with and without proxying of components
 - Allow user to choose a couple of chart styles
 - Add simple test cases for actions, reducers and views

Essential features to demo:
 - Hot reloading of views
 - Hot reloading of app, preserving global state
 - Debug tools:
  - Canceling recent actions and seeing intermediate state
  - Persisting and restoring app state from local storage

Nice to have:
 - Fetching of data from an external service

It should:
 - Demonstrate a useful scenario for reloading a change
   whilst preserving state that couldn't easily be put
   in the URL
 - Have detailed comments explaining what all of the
   configuration and API calls do
 - Would be useful to have at least one async indicator
 - Provide an obvious extension point for users testing the repo


### Demo Walkthrough

 1. Show what the app does
 2. Do a walkthrough of what happens when fetching data,
    using the dev tools. Show the initial state, the data
	for an action, how the state evolves as data is fetched
 2.1 Show logging of actions in the console
 3. Demo reverting actions
 4. Demo a trivial hot update
 4.1 Demo a slight more interesting hot update - changing
     the line colors for each chart
 5. Show what happens in the network tab when a hot update happens
 6. Add several charts and then interactively demo adding a new feature,
    zooming into charts, without reloading the page
 7. Show that all of the actions are re-run through the reducers
    when the reducer code changes by illustrating what happens when
	changing a reducer function.

### Misc Ideas

 - Encode store state in URL?
 - Automatically include dev tools. Provide instructional hints on how to open them
 - Flash parts of the UI when they are hot-updated
 - Flash parts of the UI when they re-render



