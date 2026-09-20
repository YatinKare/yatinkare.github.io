---
title: Golang Daily To-Do CLI
date: 2026-06-27
description: Starting my Go journey by building a CLI that rolls unfinished tasks into each new daily note.
hero: /images/blog-golang-daily-todo.png
heroAlt: Abstract daily Markdown pages carrying unfinished tasks forward through a Go-powered command-line workflow
featured: false
draft: false
substack: https://yatinx.substack.com/p/golang-daily-to-do-cli
---

Today I decided to start my Golang journey. I’ve been pretty keen on learning a new language, and Go was my preferred choice for a couple of reasons.

## Why Go

1. **Easy syntax:** I’ve been mostly coding in Python, so I stayed away from [Rust](https://rust-lang.org/) and C++ even though they have a lot of overlapping uses.

2. **Backend engineering:** My resume is built towards backend engineering and that’s where I want to go (at the least I don’t want to do Frontend). Golang is a very popular backend language because of its many builtin features that are well suited for scalable and cloud systems.

3. **Job opportunities:** I recently had a call with a recruiter and he told me that many students don’t have Go or Ruby experience, and having that would stand out. He said to actively look at job descriptions for the roles I would want and see what tech stacks they want. Then I would be able to showcase my experience by building a *useful* project in that language. Useful in the sense that it’s not just a project for the sake of a resume, but something that’s important.

## The daily workflow

So I built a Go CLI to manage my to-dos. But first you should know my current routine:

1. Look at the previous `…/daily/YYYY-MM-DD.md` and copy the unchecked checkboxes.
2. Create a new `…/daily/YYYY-MM-DD.md` for today and paste the unchecked checkboxes.
3. Modify it to reflect what I need to get done today.

Usually I get my whole list checked off, but there are days when I have unfinished business and most of the time I overestimate what I can do.

## What I built

In about 1.5 hours of learning Go and programming, I had my working CLI. I symlinked it to `~/.local/bin/to-do` and I have a complete `to-do` executable.

My new workflow looks like this:

1. Go to my `daily/` directory.
2. Run `to-do new`.
3. Start editing `daily/YYYY-MM-DD.md`.

It **pulls all unfinished tasks from the previous day’s file** and **creates a new Markdown to-do file with the unfinished tasks**.

## Resources and what’s next

Overall, I’m pretty happy with the result. I was easily able to understand the `go` CLI for the build and executing process and I learned the syntax easily. It wasn’t without its hiccups, but a few of the resources below helped me:

- [go.dev/doc](https://go.dev/doc/): Official Go documentation.
- [Go by Example](https://gobyexample.com/): Good, simple examples for Go slices and file manipulation.

You can find my repo [here](https://github.com/YatinKare/golang-daily-todo). And no AI was used in writing this blog or code.

Thanks for reading!

> My next project: building a simple HTTP web server in Go.
