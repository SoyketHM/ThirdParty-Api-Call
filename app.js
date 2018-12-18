const express = require('express');
const request = require('request');
const path = require('path');
const app = express();

//load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/news', (req, res) => {
    request.get({
        url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
        qs: {
            'api-key': "88fb610330f8424ab7a0e7c9502f452e",
            'sort': "newest"
        },
    }, function(err, response, body) {
        body = JSON.parse(body);
        let newses = body.response.docs;
        res.render('nypost', {newses} );
    });
});


app.get('/cricket-match', (req, res) => {
    request.get({
        url: "https://cricapi.com/api/matchCalendar?apikey=SwG25TktryU97dIiVfLFBVqFTVd2",

    }, function(err, response, body) {
        body = JSON.parse(body);
        let matchs = body.data;
        // console.log(body);
        res.render('cricket_match', {matchs} );
    });
});




//start server
app.listen(process.env.PORT || 3000, () => console.log("server start on port 3000..."));
