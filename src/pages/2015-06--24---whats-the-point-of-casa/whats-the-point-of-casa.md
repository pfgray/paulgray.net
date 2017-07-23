---
title: What’s the point of CASA?
subtitle: Indexing learning media.
date: "2015-06-24T00:00:00.000Z"
layout: post
draft: false
tags:
  - casa
  - ims
  - IMSGlobal
  - edtech
---


Currently, there’s no standard way of sharing and consuming learning content. Most LMS’s have a way to add a generic “Content Item” link to a course. If it’s more than just static content, there’s probably been some expensive custom integration developed in order for integration to occur. If you’re lucky enough to have a tool that supports LTI, your organization has probably gone through a complicated setup process while on the phone with someone from that company. If you haven’t noticed, this process is far from being automated.
Luckily, IMSGlobal(an organization that publishes standards) has been hard at work on CASA to address this issue.

# What is CASA?
CASA stands for Community App Sharing Architecture, but it has more to do with than just apps. The base requirement to share anything on a CASA network is just a URL. This URL could point to a chat application, a piece of content (a PDF discussing discrete mathematics), or some other piece of rich content (eBook, assessment).
## Sharing Apps
CASA provides the means to share these URLs in a federated environment. This means if you have a list of apps/content (or which I call learning experiences), you can share that list with another peer (a university, perhaps). As long as that peer can “understand” CASA, they will have an opportunity to have access to all of that content (note that CASA is agnostic about the pay system content may have).
Consuming Learning Experiences
Probably the most important thing that CASA does is that it provides a standardized way of consuming learning experiences. This is enabled through an agreed-upon collection of attributes. The attributes include a growing number of ways to represent your piece of content or learning application. Does your application support LTI? you can represent that in a way that LMS’s can add your application wholesale with the right configurations. Does your piece of content teach Math competencies? Add that description and your content might be recommended to instructors teaching math courses.
## A compelling use case in OER
Probably the most compelling type of content to expose over CASA is OER content. An instructor could create a lesson which teaches Spanish verb conjugations, and share it on the CASA network. A student struggling in that competency could then search an open registry for content that teaches about Spanish verbs, and find the instructor’s content.

This is in part already possible right now due to efforts from OCWSearch. If you haven’t seen it, i’d encourage you to check it out (spoiler alert, it’s amazing). They’ve basically compiled and indexed OER content from many universities into a single searchable api. This means anyone can go there, search for some content that teaches a specific subject, and find a bunch of static content which they can read.
What CASA adds to this equation is that it provides a standardized way to consume that data, opening the door for rich content to be exposed in this manner. Imagine if, instead of creating some static content, the instructor from our example created an online assessment, and added it to some CASA OER database. Then, the student searched that database (inside their LMS) for that content & found that instructor’s assessment.
Since it’s exposed via CASA, the assessment has integration metadata associated with it (LTI, anyone?), meaning the LMS can automatically integrate it into the learner’s portfolio. The application also exposes analytics data, which will help track the learner’s progress through the assessment, and when the student actually passes the assessment, the application could even report a badge back to the LMS.
What the learning app ecosystem will look like with CASA.
I haven’t heard CASA being talked about much. I think this is partly because it is new, but also because people question it’s worth. People may be wondering “What’s the point?”.
In the future, when learners search for content, they’ll be searching not only through static content on OCWSearch, they’ll be searching a federated network of rich content; rich content that will automatically provide integration, analytics insight, credentialing (learning outcomes), and a better overall experience for learning.
## Get Involved
Are you a content provider and would like to share your content via CASA? Let us help you! Tweet [@learningobjects](https://twitter.com/learningobjects), or email me.

Are you interested in expanding the specification for new & exciting use cases? Join IMSGlobal and the workgroup calls!

Are some of these topics interesting to you & you want to get involved? Work with us at Difference Engine!
