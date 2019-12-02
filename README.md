# Instructions

## How to run the code

You will need an .env file with firebase config settings to run the project. 

1. Run `npm i`<br />
2. Type `yarn start`<br />

The project should start at localhost:3000 connect to the firebase database that I have setup-ed and pull the data.<br />

## Explanation of architecture

The whole source can be found .src<br />
The architecture is divided in 3 folders:<br />
`routes` -holds the pages<br />
`components` - most of code logic is here<br />
`interfaces` - needed interfaces<br />
`infra` - Infrastructure, currently only holds the firebase context.<br />

Point of start is the App.tsx file. Here the created firebase context is added so it would be initialized only once and can be used anywhere where it is needed by using
`const fireContext = useContext(FirebaseContext);`<br />

Routes contains the 2 pages.<br />
`IndexPage` - is the movie listing page that pulls all the movies from firebase and allows for searching by title<br />
`CommentPage` - Users can add a comment and a specific firebase document is created for the specified movie.<br />

## If you had more time, what would you like to improve<br />

I could make the table paging work server side.<br />
Improve the overall ux and styling of the pages.<br />
Make the table be responsive and scale on mobile devices.<br />
