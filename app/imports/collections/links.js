import { Mongo } from 'meteor/mongo';
import validUrl from 'valid-url';
import { check, Match } from 'meteor/check';

Meteor.methods({
   'links.insert': url => {
       // validUrl.isUri(url): If URI valid, returns URL; if invalid, returns undefined
       // if truthy value returned from Match.Where(), then check passes
       // if Match.Where() returns false, check throws an error
       check(url, Match.Where(url => validUrl.isUri(url)));

       // We're ready to save the url
       const token = Math.random().toString(36).slice(-5);
       Links.insert({
           url,
           token,
           clicks: 0
       });
   }
});

export const Links = new Mongo.Collection('links');