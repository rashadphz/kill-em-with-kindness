# kill-em-with-kindness

### Machine Learning to calm your rage.

![Demonstration](https://cdn.discordapp.com/attachments/689565809861066808/825731654793297990/temp.gif)

# Project Story

## Inspiration
A study from Forbes revealed that over 90% of Internet users say they’ve experienced toxicity at one point in their lives. People are more likely to be hurtful when they can hide behind anonymity. Additionally, some people may not even be aware of their own toxicity. However, by encouraging folks to watch their words, we can help make the Internet a better place for everyone.

## What it does
As you type in any input field across the web, Kill em With Kindness moderates your sentences, highlighting ones that are harmful and toxic in red, and encouraging you with green highlights on sentences that promote positivity. In addition, as your words become better or worse, our toxicity indicator will turn darker shades of green and red, respectively, and indicate the chance of another user viewing your message as toxic.

## How we built it
We started by gaining familiarity with the Natural Language Processing Perspective library offered by Google Cloud. We then used the Google Chrome extension APIs to interface with text input fields. Next, we created a Python wrapper for the Perspective library using a Flask REST API, then hosted it on Heroku. From there, we injected HTML elements in the DOM in order to change the colors of sentences and introduce our toxicity indicator.

## Challenges we ran into

Most existing solutions for editing text fields as a user types are either outdated or janky. We tried most of the solutions on the web, but couldn’t find one that worked, so we hacked our own after drinking lots of coffee and reading a lot of JavaScript blogs. We spent over three hours at one point trying to solve an issue where our span tags were nested inside each other, but ended up debugging the problem with lots of console.logs(). In addition, we also were new to Heroku, and had to learn a lot about working with their CLI.

## What we learned and accomplishments we're proud of

Before today, neither of us had ever built a Chrome extension. We learned it’s not easy, and not very similar to building a web app or software. However, learning how to solve a problem we had never faced before was a satisfying experience. In fact, [the leading StackOverflow answer](https://stackoverflow.com/a/37160584/4352114) about changing font color within a textarea will tell you it’s impossible - however, we put together a workaround that is very effective - check it out on our GitHub.

## What's next for Kill Em With Kindness

In the future, we hope to introduce features such as smart word replacement, to help you make great choices when you just can’t think of something nice to say. Look to the Chrome Web Store soon so you can download Kill Em With Kindness, and moderate your OWN rage with machine learning.
