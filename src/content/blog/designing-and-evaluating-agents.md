---
title: Designing and Evaluating Agents — A comparison between t3 code and my internship agent
date: 2026-11-11
description: Comparing how I evaluated an order investigation agent at Belk with how T3 Code tests agent tool use.
hero: /images/blog-designing-evaluating-agents.png
heroAlt: Abstract evidence cards flow through an agent into parallel evaluations and a feedback loop
featured: true
draft: false
substack:
---

I recently saw this tweet from Theo, creator of t3 code:

![Theo's post about MCP authentication and connection flows](/images/blog-agent-evals-theo.png)

I was reminded of my experience building an agent at Belk this summer. I wanted to compare my approach with T3 Code’s and see what I could learn from the differences.

---

Lets start with what I did at Belk:

I created an order investigation agent that answered questions about Belk’s fulfillment network system. It reduce investigation times and I integrated it within the dashboard so they could see it alongside their data. 

The important part is that the agent had to:

1. Understand the MILP model + system.
2. Understand all of Belk’s terminology.
3. Understand orders and their relation to the MILP system and locations.

I provided GCS json logs and markdown documentation to the agent via MCP, but I needed a good way to tell the agent its goal, how to investigate via its tools, and how to report.

## Belk Agent Evaluation and Hill Climbing

Early on, I asked my team if I could the record meetings and gather transcripts where business users asked developers questions like “for order #… why did it choose location A over location B” and developers answered with evidence from system logs + knowledge of the system.

Combining the transcripts with documentation about the MILP system & MS Teams chat logs, I had a set of actual cases to use. After confirming the data looked correct, I asked a large model to use subagents to find categories and create eval questions / answers.

The result was 10 categories with ~5 questions & answers each and I had my eval cases. 

![Diagram of sources and agents creating evaluation cases](/images/blog-agent-evals-case-creation.png)

*I suggested to the large agent to split the data by dates so the subagents could comb through approx. the same amount of data.*

I had a starting point for the prompt of the agent from what I thought was good, and ran it on the initial eval. only 12/51 cases passed. 

To improve the score I asked an orchestration agent to run 10 parallel sub-agents for each category. For each question, the sub-agent would create a new session and compare the models tool calls + output to the expected output. For each question, the sub-agent would return a score out of 5 and then the category would receive a score out of 5 with any notes. the large model would then use score + run-data from each category and create edits to the prompt. I told the orchestration agent to run this until it achieved a 90% pass for the number of test cases.

After 2-3 hill climb loops, it achieved 90% and I noticed that the prompt was becoming very large so I asked it to cut down what it thought wasn’t needed and continue until 95%.

After a couple more loops, I had a investigation agent that covered 95% of known cases.

I re-used this idea for my MCP tool descriptions in a smaller fashion on a smaller scale.

![Diagram of the parallel evaluation and improvement loop](/images/blog-agent-evals-hill-climb.png)

## t3’s Differences

t3 is an open source meta-harness that provides special tools like managing PRs, running long tasks, and delegation tools for sub-agnets.

t3’s issue was that models weren’t using its ecosystem well which resulted in more tokens than needed.

They gathered situations via audits of real threads including what tools agents actually used pretty similar to my data gathering.

One difference I noticed is they recorded deterministic actions instead of just input and output. They stored case data in the `.ndjson` format. I stored mine in markdown. I can’t tell exactly what direct impacts it had or why this was chosen, but I will say that this is a much better way of storing information because now that its structured, its much easier to sort and filter out the data. For example, it would be easy to analyze and find out what data is either missing or which scenarios are over represented. They also recorded actual system changes, not just that an agent called a tool. This enriches the data because they can evaluate the system as a whole instead of narrowly inspecting the agent.

During actual evaluation, I had an LLM-as-a-judge approach which made sense for the expected output. For many of the T3 cases, the expected behavior was precise enough where they could look for deterministic signals such as if the agent called a specific tool, didn’t call a forbidden tool, called tools in the correct order, or if its final response had the correct info it could only get from calling the right tools (hallucination). 

I think one of the more interesting pieces comes from a rule in their `evals/README.md`:

> *Model output varies. Run each case several times. A case fails when half or more of its samples fail. Compare against a ****baseline**** on the same model, not against an absolute score.*

This is a very impactful difference. I assumed that one run per case + a score would be a good indication of how it would be in production. Even with the same situation and the same model, the output can vary between runs, so running a case multiple times gives a better view. t3 suggests running the eval multiple times and use a percentage threshold to determine when a case would fail. Also, comparing evaluations to a baseline instead of giving it a raw scores keeps more context and (probably) leads to better interpretation of why things changed from the previous run.

With this process, they changed tool descriptions and even removed certain tools from types of agents that didn’t need them. 

I think the bigger question to ask is: If an agent keeps making a mistake do you adjust instructions or should the tool be designed such that a undesirable action is avoided and provides better feedback to the agent?

I think this can be, and will be, explored more as more companies shape agents around evals. I definitely struggled with this question, I’m very interested to see how companies and developers draw that line.

One T3 change aimed to reduce the size of the tool schemas sent to agents. Its eval tested agents using the smaller schemas, but a later check of the real server found that most tools still sent the larger versions. The team fixed the registration path and added a test for what the server actually exposed.

One other changed they made was to reduce the size of the tool schemas sent to agents via MCP. Their evals tested agents with smaller schemas but later, during a check of the real server, it was found that most tools were sending the larger versions. They fixed this and added a test for what the server actually sent and exposed.

## Authentication

In my screenshot, Theo was concerned that his model couldn’t correctly architect a reliable MCP and was having problems with authentication. This doesn’t have any direct impact to my agent & MCPs since I created an internal tool and the scope was smaller, but I did notice how strongly t3 tied its questioning, reasoning, developing, testing, and integration with real world cases first instead of just jumping the gun into implemented. 

I definitely made that mistake when I first started but luckily I had a great team who gave me plenty of feedback on what they expected and still trusted me to find a good solution.

## Takeaways

Here are some things I took away from this comparison:

- A effective agent evaluation involves understanding the problem, gathering the correct and large amounts of data, and holding on to deterministic checks whenever possible.
- Never trust a model’s outputs = more repetitions + threshold. Adjust the thresholds.
- Its important to define to success and equally important to define a failure for an evaluation.
- Keep testing and training evals. I did not think of this before hand which could’ve introduced some overfitting to evals in the agent prompt.

I enjoyed doing this deep dive because I also got to reflect on how I 1. used AI to code in real production ~6 months ago 2. looked at how good developers think about problems in the field i’m interested in.

Thank you for reading my article!

