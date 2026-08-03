<script>
  import AmbientBackground from './lib/AmbientBackground.svelte';
  import InteractivePortrait from './lib/InteractivePortrait.svelte';
  import ProjectRow from './lib/ProjectRow.svelte';
  import QuickLinks from './lib/QuickLinks.svelte';
  import WaveDivider from './lib/WaveDivider.svelte';

  const roles = [
    {
      year: '2026', datetime: '2026-05', location: 'Charlotte, NC',
      title: 'Retail Systems Software Engineer Intern', company: 'Belk',
      description: 'Shipped an agent-assisted fulfillment investigation workflow, built database and SAML authentication, and improved the performance of large operational views.',
      tech: ['Google ADK', 'MCP', 'MySQL', 'SAML'],
    },
    {
      year: '2025', datetime: '2025-01', location: 'New York, NY',
      title: 'Machine Learning Engineer Intern', company: 'Cadent',
      description: 'Automated integration tests across more than 50 cloud services and validated Airflow transformations spanning Dataproc and BigQuery.',
      tech: ['Python', 'Airflow', 'GCP', 'AWS'],
    },
    {
      year: '2024', datetime: '2024-06', location: 'Duluth, GA',
      title: 'Data Management Intern', company: 'Primerica',
      description: 'Automated governance at 5,000-table scale and built data pipelines spanning Collibra, Qlik, DB2, and Vault.',
      tech: ['Python', 'C', 'Pandas', 'Qlik'],
    },
  ];

  const projects = [
    {
      number: '01', name: 'Hermes Agent Home Lab', meta: 'Hermes · MCP',
      description: 'A private, local-first environment for durable research, browser workflows, scheduled watchdogs, and dashboard-first automation.',
      detail: 'It runs on my own infrastructure, so its dashboards and automations stay private instead of becoming public demos.',
    },
    {
      number: '02', name: 'NotebookLM questions workflow', meta: 'Python · SvelteKit',
      description: 'Turns question screenshots into grounded, reviewable answer cards using course source material.',
      href: 'https://github.com/YatinKare/notebooklm-questions-workflow',
    },
    {
      number: '03', name: 'EventifyIt', meta: 'Python · Google ADK',
      description: 'Converts event flyers into calendar invites through OCR, entity extraction, and cross-field validation.',
      href: 'https://github.com/YatinKare/cf_ai_eventifyit',
    },
    {
      number: '04', name: 'TripSync', meta: 'SvelteKit · ADK',
      description: 'Reconciles a group’s preferences into ranked destinations and itineraries through parallel research.',
      href: 'https://github.com/YatinKare/multi-person-ai-trip-planner-',
    },
    {
      number: '05', name: 'Cursor usage CLI', meta: 'Go',
      description: 'A focused Go utility for inspecting Cursor usage statistics from the command line.',
      href: 'https://github.com/YatinKare/golang-cursor-usage',
    },
  ];

  let emailLabel = 'Copy my email';

  async function copyEmail() {
    const email = 'kareyatin@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      emailLabel = 'Email copied';
      window.setTimeout(() => (emailLabel = 'Copy my email'), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }
</script>

<a class="skip-link" href="#main">Skip to content</a>
<AmbientBackground />
<QuickLinks />

<main id="main" class="page-shell">
  <aside class="intro" aria-labelledby="intro-title">
    <div class="identity">
      <InteractivePortrait />
      <div class="identity-copy">
        <strong>Yatin Kare</strong>
        <span>Software engineer</span>
        <span>Athens, Georgia</span>
      </div>
    </div>

    <h1 id="intro-title">Hi, I’m Yatin.</h1>
    <p>I’m a computer science student at <strong>the University of Georgia</strong>. I build <strong>AI-assisted products</strong>, cloud data workflows, and small tools that make computers more useful.</p>
    <p>Most recently, I worked on retail systems at <strong>Belk</strong>. At home, I run a <strong>Hermes Agent lab</strong> connecting automations, research, and private dashboards.</p>

    <nav class="intro-actions" aria-label="Contact and profiles">
      <button class="copy-email" type="button" onclick={copyEmail}>{emailLabel}</button>
      <a href="https://github.com/YatinKare" target="_blank" rel="noreferrer">GitHub</a>
      <a href="https://www.linkedin.com/in/yatin-kare" target="_blank" rel="noreferrer">LinkedIn</a>
    </nav>
  </aside>

  <div class="content">
    <WaveDivider />

    <section class="section" aria-labelledby="experience-title">
      <h2 id="experience-title">Experience</h2>
      {#each roles as role}
        <article class="role">
          <div class="role-date"><time datetime={role.datetime}>{role.year}</time><span>{role.location}</span></div>
          <div class="role-body">
            <h3>{role.title} <span>· {role.company}</span></h3>
            <p>{role.description}</p>
            <ul class="role-tech" aria-label="Technologies">
              {#each role.tech as item}<li>{item}</li>{/each}
            </ul>
          </div>
        </article>
      {/each}
    </section>

    <WaveDivider />

    <section class="section" aria-labelledby="projects-title">
      <h2 id="projects-title">Interesting projects</h2>
      <div class="project-list">
        {#each projects as project}<ProjectRow {project} />{/each}
      </div>
    </section>

    <footer data-nosnippet>
      <span>Yatin Kare · 2026</span>
      <a href="mailto:kareyatin@gmail.com">kareyatin@gmail.com</a>
    </footer>
  </div>
</main>
