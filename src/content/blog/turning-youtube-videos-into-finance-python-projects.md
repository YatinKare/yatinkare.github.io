---
title: Turning YouTube Videos into Finance Python Projects Using the Ralph Loop
date: 2026-02-02
description: How Claude and the Ralph Loop built a Polymarket arbitrage CLI tool—and where the result failed.
hero: /images/blog-ralph-loop-finance.png
heroAlt: Abstract video signal flowing through a recursive agent task loop into a finance command-line interface
featured: false
draft: false
substack: https://yatinx.substack.com/p/turning-youtube-videos-into-finance
---

> *Note: I start my introduction with the background of the Ralph Loop. If you’re looking for the implementation, go to [The Ralph Loop](#the-ralph-loop).*

I came across [this five-minute YouTube video](https://www.youtube.com/watch?v=KBzEDYhfqz8) by **[Dave Wang](https://www.youtube.com/@davewang_ai)** that explains how ChatGPT can find mispriced Polymarket bets. My first thought was, *I can 100% waste my night trying to automate this.* I mean, it didn’t sound too difficult in my head—just a few API calls, some math, and you’d have the same thing explained in the video.

But then I wanted to try a different approach: what if I never took control of the coding at all? What if I only reviewed the plan and then looked at the final product?

Unfortunately, this still isn’t fully possible because of limited context windows in LLMs, but the **Ralph Loop** takes a shot at solving that problem. And honestly, the final output turned out way better than I expected.

## The Ralph Loop

For those who don’t know, the Ralph Loop is actually pretty simple:

> Define a `plan.md` → Claude creates a task list and progress file → for each task, use a new Claude chat → implement the next task → update the progress file.

This approach gives you a fresh context for each task, so the context window isn’t cluttered with redundant information from previous steps. As most people know, working in a single long chat becomes cumbersome because the LLM starts hallucinating and/or forgetting things, which leads to even more work for the human.

But you might ask: *How does each Claude session know what happened previously?* That’s where the progress file comes in. It’s a detailed set of notes from the previous iteration, and the user can customize it however they want—for example, by adding common Claude pitfalls to avoid.

Originally, I saw it in [this video by Ben Davis](https://www.youtube.com/watch?v=HqPL5ONfOL8), which then pointed me to the [original 30-minute talk](https://www.youtube.com/watch?v=4Nna09dG_c0) from the creator. I highly recommend watching the original; not only does it explain the loop itself, but it also breaks these new tools down into core computing concepts like memory allocation and what that means for the future of software tools.

## Beginning development

To start, I fed Dave’s video into ChatGPT and asked for a simple PRD for a Python CLI tool, along with a list of all the APIs I would need—ideally keeping everything free. After going back and forth, I realized I needed a system to actually run the Ralph Loop.

I *could* have created the Bash script from scratch, but I was hoping someone had already done it. Luckily, someone had: [Portable Ralph](https://www.portableralph.com/). It’s essentially a simple collection of Bash scripts that live in your home directory and let you run iterative Claude instances that pick up tasks automatically.

Here’s an overview of how the system looks:

```text
1. ChatGPT generates plan.md
2. Ralph builds a task list: ralph ./plan.md plan
3. Review the output file
4. Kick off the loop: ralph ./plan.md build
```

After some time, I got a full project.

## Testing and afterthoughts

I was surprised by how polished everything looked. The `README.md` was decent—a bit long for my taste—commits were well structured, and the `plan_PROGRESS.md` file contained detailed notes from each Claude iteration, including what had been completed and important reminders. Overall, it looked promising.

So I tested one of the examples… and it failed.

Here’s a sample output so you can see for yourself:

```text
# Search for Bitcoin-related markets
uv run polyarb markets --search "BTC"

# Output:
python-polymarket-arbitrage on main is v0.1.0 via Python
❯ uv run polyarb markets --search "Trump" --limit 5
INFO: Fetching markets from Polymarket Gamma API...
INFO: HTTP Request: GET https://gamma-api.polymarket.com/markets?limit=5

ID     End Date     Title
------------------------------------------------------------
12     2020-11-04   Will Joe Biden get Coronavirus before...
17     2021-01-02   Will Airbnb begin publicly trading be...
18     2020-11-04   Will a new Supreme Court Justice be c...
19     2021-01-02   Will Kim Kardashian and Kanye West di...
20     2021-01-02   Will Coinbase begin publicly trading ...

Showing 5 market(s)
```

It doesn’t look terrible until you realize the end date was from five years ago. And this effect cascades everywhere.

I still have a lot of testing left to do, but I think this is a solid start. One big lesson I learned is that you need a much stronger example or plan for this loop to be truly efficient. The Ralph Loop can consume a lot of tokens—and therefore money—and it’s not worth it if the final result doesn’t actually work.

I also think TDD (test-driven development) is a strong strategy that could pair really well with the Ralph Loop for more reliable outcomes.

Here’s the [code](https://github.com/YatinKare/python-polymarket-arbitrage). Thanks for reading my first post!

> *This is **not** financial advice and is only for educational purposes.*
