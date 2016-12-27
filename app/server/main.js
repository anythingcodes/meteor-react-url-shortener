import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links';
import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route';

Meteor.startup(() => {
  Meteor.publish('links', () => Links.find({})); // not ES6
});

// Executed whenever a user visits with a route like
// 'localhost:3000/abcd'
function onRoute(req, res, next) {
    // Take the token out of the URL and try to find a
    // matching link in the Links collection
    const link = Links.findOne({ token: req.params.token });

    if(link) {
        // Increment link counter in DB
        Links.update(link, { $inc: { clicks: 1 } });

        // If we find a link object, redirect the user to
        // a long URL
        res.writeHead(307, { 'Location': link.url });
        res.end();
    } else {
        // If we don't find a link object, send user
        // to our normal React app
        next();
        // handed off to next middleware in line until handed
        // off to React app
    }


}

const middleware = ConnectRoute(router => { // not ES6
  router.get('/:token', onRoute);
});

WebApp.connectHandlers.use(middleware);