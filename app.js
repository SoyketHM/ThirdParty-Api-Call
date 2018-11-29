const express = require('express');
const request = require('request');
const path = require('path');
const app = express();

//load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    request.get({
        url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
        qs: {
            'api-key': "88fb610330f8424ab7a0e7c9502f452e",
            'sort': "newest"
        },
    }, function(err, response, body) {
        body = JSON.parse(body);
        let newses = body.response.docs;
        //     web_url: e.web_url,
        //     snippet: e.snippet,
        //     source: e.source,
        //     headline: e.headline.main,
        //     pub_date: e.pub_date
        // }
        // res.json(body.response.docs.map(e => 'web_url: '+e.web_url+'snippet: '+e.snippet+'source: '+e.source ));
        // console.log(newses[0]);
        res.render('nypost', {newses} );
    });
});




//start server
app.listen(3000, () => console.log("server start on port 3000..."));
