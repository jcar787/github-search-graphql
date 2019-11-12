# Github Search using GraphQL
To use this repository visit: [http://github-search-graphql.s3-website-us-west-2.amazonaws.com/](http://github-search-graphql.s3-website-us-west-2.amazonaws.com/)

Notes:
1. I would start saying that this project was really fun to build. I learn new technologies in a matter of days. redux-saga, apollo client and graphql. I never worked with those technologies before and I needed to do some digging and practice a couple of times first until I get the hang of it.

2. So far a couple of optimizations, comments and refactors I would do are:
    1. Learn how to use more effectively the Apollo Client. Apollo Client has a provider, that caches previous responses. Time constraints and because I don't know the technology that well I didn't use it but with more time at my dispossal I would've experimented more with it.
    2. I would've created another set of state call it history. In this history before I erased the previous search and its results I would've send the object to the history, if the user makes the same search again I load the object from the history into the current search.
    3. I would like to enhance the CSS of the application, so far it seems really minimal. Cards could've look better in my opinion and I would like to use react animations too, so it looks more user friendly. I tried to use react-spring to achieve this (another technology I learned too), but its was creating a problem with the click of the anchor tag.
    4. So far I've tested on Chrome, Firefox and Safari and the application seems to be working as expected. I didn't have time to test it on Edge. So I didn't found possible issues cross browser issues.
    5. Another refactor in the code organization I would've like to do is making the card component more available for other components as well. Right now I feel that component is too coupled to the search, but since the search is the only one using it, I add it to the search directory. Normally components that I can share between other components I tend to add them in a components directory so every other component could use it.

3. Thanks for the opportunity, I truly appreciate it and I learned a lot of stuff. I'm truly grateful.