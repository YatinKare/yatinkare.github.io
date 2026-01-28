---
layout: post
title: "Current Works"
date: 2025-10-23 21:16:00 -0400
categories: general
author: Yatin K.
tags: [general, project]
---

Hello everyone visiting my page, if this is your first time looking at my blog, please check out my [About Me]({% link about.markdown %}) page.

## What I'm currently working on

I've had this idea for a project for a while and with the rise of AI I've given a few shots at a prototype. My idea came to me when I was in History class last year where for online lectures I would open up Word Desktop and use the transcribe feature to capture what my professor would be saying. Then I would put the lecture's PowerPoint and the Word transcript into ChatGPT and ask it to concatenate each bullet point with the corresponding transcription. The output would be:

```markdown
## Slide 4 : WWII

- Bullet point 1 ...
    - {Transcription excerpt for this bullet point}
- Bullet point 2 ...
    - {Transcription 2}
- Bullet point 2 ...
    - {Transcription 3}
```

Essentially, ChatGPT would cut up the transcription and paste the relevant transcription part under the bullet point and it would make studying / taking notes 100% more effective than just taking notes during the lecture + studying the notes and the slides independently. This way I could **directly correlate the content to the analysis that my professor wanted me to know**.

Obviously, Because of this repetitive workflow, I sought to see if there was a more user friendly way way. Since I didn't find anything online I tried to make it myself. 

Now, anyone with a programming/engineering/tinkering/maker mindset knows they would easily take a 1 hour manual workflow and spend 100 hours trying to automate it. I'm nothing different so I implemented a basic front end where I could have a website that displays a slide show and whenever you clicked on an element, it would have a pop-up that showed the transcription for the element on the slide show + the audio transcription. But because I was using `Svelte` (which renders to `HTML`), It didn't feel right because it was super bland. My whole idea was that a user could upload a PowerPoint and a audio file and they would get their interactive slide deck right in their browser.

So I looked for anyways to translate a PowerPoint to HTML. Again, after researching, I could not find anything. I did find some extremely pricey libraries, but I don't want to pay thousands of dollars per year as a student. 

Again, I'd thought I'd make that too --> **A PowerPoint to HMTL translator**. This is my 3rd attempt at creating this open source python library. I'm going to blog every step so I can do it right, instead of doing it lazily the first two times. I'm going to document researching, learning, prototyping, designing, coding, testing, deploying, marketing until I can reach my mvp for this project.

This blog is not only to help document my progress but to also make me a better writer. So by communicating my progress, I hope that I can learn to express my thoughts better and becoming more experienced in building in public.
