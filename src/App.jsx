import React, { useEffect, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import careersData from './data/careers.json'

/* ── scroll-reveal hook ───────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('revealed')),
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ── data ─────────────────────────────────────────────────────── */
const ServiceIcons = {
  StaffAugmentation: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  ContinuousSupport: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10"/>
      <path d="M12 6v6l4 2"/>
      <path d="M19 22v-4h-4"/>
      <path d="M22.83 17.63A9.97 9.97 0 0 1 19 22"/>
    </svg>
  ),
  SoftwareDevelopment: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  Consulting: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16v-4"/>
      <path d="M12 8h.01"/>
    </svg>
  ),
  ProjectManagement: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
    </svg>
  ),
  ArchitecturalSolutions: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
}

const serviceItems = [
  {
    Icon: ServiceIcons.StaffAugmentation,
    title: 'Staff Augmentation',
    text: 'CrownIT Solutions Staff Augmentation services enables you in getting qualified and experienced personnel to suit your requirements working exclusively for you from our offices. It is a perfect way to accomplish your special or seasonal projects without adding a permanent staff.',
  },
  {
    Icon: ServiceIcons.ContinuousSupport,
    title: 'Continuous Support',
    text: "Consistency in delivering top-notch IT products and services is crucial for your enterprise and your clientele – but to truly stand out, integrating new technologies is essential. CrownIT Solution's IT consulting bridges this gap, ensuring you deliver quality while embracing innovation without compromise.",
  },
  {
    Icon: ServiceIcons.SoftwareDevelopment,
    title: 'Software Development Services',
    text: 'From a single application to an enterprise-wide system, We can deliver the right solutions to address business needs quickly and efficiently.',
  },
  {
    Icon: ServiceIcons.Consulting,
    title: 'Consulting',
    text: "CrownIT Solutions stands at the forefront of technological innovation. With a team steeped in deep tech expertise, we're more than just consultants. We're your partners in shaping a future-ready IT roadmap. Our approach is tailored, ensuring your business not only adapts but thrives. From digitizing operations and optimizing your software portfolio to harnessing the power of mobile solutions, we're here to elevate your journey every step of the way.",
  },
  {
    Icon: ServiceIcons.ProjectManagement,
    title: 'Project Management',
    text: "CrownIT Solutions has the tools and experience required to help enterprises make strategic decisions and take advantage of today's latest technologies.",
  },
  {
    Icon: ServiceIcons.ArchitecturalSolutions,
    title: 'Architectural Solutions',
    text: 'Legacy IT systems can hinder progress. With our enterprise architecture specialists, the transition from cumbersome IT structures to agile, cloud-based solutions becomes seamless. We emphasize streamlined delivery and the integration of pioneering technologies, positioning you at the forefront of innovation.',
  },
]

const values = [
  { label: 'Customer-Centric', desc: 'We put the best interests of our clients at the core of everything we do.' },
  { label: 'Trust', desc: 'We conduct ourselves with integrity and honesty in every engagement.' },
  { label: 'Teamwork', desc: 'We respect individual contributions, yet value partnership and teamwork highly.' },
  { label: 'Accountable', desc: 'We are committed to our customers and take accountability for our actions.' },
  { label: 'Excellence', desc: 'We strive to build on best practices, innovation, and a relentless pursuit of quality.' },
]

const lcaLinks = [
  ['Business Intelligence Analysts — TX 2025', 'https://crownits.com/wp-content/uploads/2026/04/Business-Intelligence-Analysts_TX_2025-Certified-LCA.pdf'],
  ['Computer Systems Analysts — FL 2025', 'https://crownits.com/wp-content/uploads/2026/04/Computer-Systems-Analysts_FL_2025-Certified-LCA.pdf'],
  ['Network & Computer Systems Administrators — IN 2025', 'https://crownits.com/wp-content/uploads/2026/04/Network-and-Computer-Systems-Administrators_IN_2025-Certified-LCA.pdf'],
  ['Network & Computer Systems Administrators — OH 2025', 'https://crownits.com/wp-content/uploads/2026/04/Network-and-Computer-Systems-Administrators_OH_2025-Certified-LCA.pdf'],
  ['Software Developer — OH 2025', 'https://crownits.com/wp-content/uploads/2026/04/Software-Developer_OH_2025-Certified-LCA.pdf'],
  ['Software Developer — TX 2025', 'https://crownits.com/wp-content/uploads/2026/04/SOftware-Developer_TX_2025-Certified-LCA.pdf'],
  ['Software Developer 2 — OH 2025', 'https://crownits.com/wp-content/uploads/2026/04/Software-Developer2_OH_2025-Certified-LCA.pdf'],
  ['Software Developer — IL 2024', 'https://crownits.com/wp-content/uploads/2026/04/Software-Developers_IL_2024-Certified-LCA.pdf'],
  ['Software Developers — OH 2024', 'https://crownits.com/wp-content/uploads/2026/04/Software-Developers_OH_2024-Certified-LCA.pdf'],
  ['Software Quality Assurance Analysts — NY 2025', 'https://crownits.com/wp-content/uploads/2026/04/Software-Quality-Assurance-Analysts_NY_2025-Certified-LCA.pdf'],
]

/* ── layout ───────────────────────────────────────────────────── */
function Layout({ children }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="site-shell">
      <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
        <div className="header-accent-line" />
        <div className="container header-inner">
          <a href="/" className="brand">
            <img src="/Logo.png" alt="CrownIT Solutions" className="brand-logo" />
            <span className="brand-text">
              <span className="brand-title">Crown IT Solutions</span>
              <span className="brand-sub">IT Staffing and Consultancy Services</span>
            </span>
          </a>
          <nav>
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/company">Company</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/careers">Careers</NavLink>
            <NavLink to="/lca-eta-9035">LCA</NavLink>
            <NavLink to="/contact-us" className="nav-cta">Let's Talk</NavLink>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <a href="/" className="footer-brand-link">
              <img src="/Logo.png" alt="CrownIT Solutions" className="footer-logo" />
              <span className="footer-brand-text">
                <span className="footer-brand-name">Crown IT Solutions</span>
                <span className="footer-brand-tag">IT Staffing and Consultancy Services</span>
              </span>
            </a>
            <p className="footer-copy">© Copyright 2025 CrownIT Solutions, LLC. All Rights Reserved.</p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h5>About</h5>
              <NavLink to="/company">Team</NavLink>
              <NavLink to="/company">History</NavLink>
              <NavLink to="/careers">Careers</NavLink>
            </div>
            <div className="footer-col">
              <h5>Legal</h5>
              <NavLink to="/privacy-policy">Privacy Policy</NavLink>
              <NavLink to="/terms-and-conditions">Terms and Conditions</NavLink>
              <NavLink to="/contact-us">Contact Us</NavLink>
            </div>
            <div className="footer-col">
              <h5>Social</h5>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter / X</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ── home ─────────────────────────────────────────────────────── */
function HomePage() {
  useReveal()
  return (
    <>
      {/* Hero */}
      <section className="section-hero">
        <div className="container">
          <p className="eyebrow" data-reveal>IT Consulting &amp; Staff Augmentation</p>
          <h1 data-reveal>A commitment to Innovation<br />and Empowering People</h1>
          <p className="hero-lead" data-reveal>
            'IN-SOURCING' is the key of our success. At CrownIT Solutions, we define our
            success not by quantity, but by the quality of client service and the lasting
            contributions made by the talent that we have referred.
          </p>
          <div className="hero-actions" data-reveal>
            <NavLink to="/services" className="btn-primary">Our Services</NavLink>
            <NavLink to="/contact-us" className="btn-ghost">Get in Touch</NavLink>
          </div>
        </div>
      </section>

      {/* Intro band */}
      <section className="section-light">
        <div className="container section-intro" data-reveal>
          <p className="overline">Why CrownIT</p>
          <h2>We are here to help you SUCCEED</h2>
          <p className="body-lg">
            No matter how big or small, your company can benefit from CrownIT Solutions.
            We specialize in technology solutions, systems integration, rapid application
            development and process automation. Our service offerings help push your
            business to greater heights.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-white">
        <div className="container">
          <p className="overline" data-reveal>What we do</p>
          <h2 className="section-heading" data-reveal>Our Core Services</h2>
          <div className="card-grid">
            {serviceItems.map((s, i) => (
              <article className="card" key={s.title} data-reveal style={{ animationDelay: `${i * 0.07}s` }}>
                <span className="card-icon"><s.Icon /></span>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mission band */}
      <section className="section-dark">
        <div className="container two-col" data-reveal>
          <div>
            <p className="overline-light">Our Purpose</p>
            <h2 className="heading-light">An array of resources</h2>
            <p className="body-light">
              At CrownIT Solutions, we are a family unit powered by diversity, inclusion,
              transparency, respect, integrity and passion for our clients and our people.
              Our business growth depends on our employees' professional development. By
              forging a meaningful partnership with our people, we stay nimble, ahead of
              the competition and on top of our industry. Come see what we're all about!
            </p>
          </div>
          <div className="mission-box">
            <h3>Our Mission</h3>
            <p>
              Our mission is to empower organizations with cutting-edge IT solutions that
              simplify complexity, enhance security, and drive sustainable growth. By
              offering tailored consulting services and strategic guidance, we help
              businesses unlock the full potential of technology to achieve their goals and
              thrive in a rapidly evolving digital landscape. With a commitment to
              innovation, excellence, and customer success, we strive to be the trusted
              partner for transforming challenges into opportunities.
            </p>
            <div className="newsletter-note">
              <span>✓ IT Staff Augmentation</span>
              <span>✓ Project Management</span>
              <span>✓ Software Development</span>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA band */}
      <section className="section-accent">
        <div className="container cta-band" data-reveal>
          <div>
            <p className="cta-quote">"Your success is our success."</p>
            <p>
              CrownIT Solutions has spent more than a decade helping companies reduce
              costs, strengthen data security, improve the customer and employee
              experience, and boost team productivity. Partner with us so we can help
              you maximize the success of your technology investment.
            </p>
          </div>
          <NavLink to="/contact-us" className="btn-primary">Partner with Us</NavLink>
        </div>
      </section>

      {/* Careers inline callout */}
      <section className="section-white">
        <div className="container cta-band" data-reveal>
          <p>
            If you are interested in joining our growing team, please email your
            resume to: <a className="inline-link" href="mailto:hr@crownits.com">hr@crownits.com</a>
          </p>
          <NavLink to="/careers" className="btn-primary">View Careers</NavLink>
        </div>
      </section>
    </>
  )
}

/* ── company ──────────────────────────────────────────────────── */
function CompanyPage() {
  useReveal()
  return (
    <>
      <section className="section-hero section-hero--sm">
        <div className="container">
          <p className="eyebrow" data-reveal>Who We Are</p>
          <h1 data-reveal>Company</h1>
        </div>
      </section>

      <section className="section-white">
        <div className="container prose" data-reveal>
          <p>
            CrownIT Solutions, LLC is one of the fastest growing Information Technology
            consulting and implementation firms providing high quality, cost-effective
            and timely system/application software solutions for the business needs of
            its customers in the U.S. marketplace.
          </p>
          <p>
            CrownIT Solutions has rich industry experience and application knowledge
            in e-Commerce, electrical and electronics, manufacturing, financial,
            transportation, health-care, telecommunications, and retail systems.
            This helps it maintain and deliver high quality and satisfaction to its
            clients. Our unprecedented growth has been due to our strong commitment
            toward our customers' satisfaction, cost-effectiveness and timeliness
            of our deliverables.
          </p>
          <p>
            Our mission is to bring value to our customers, our clients, and to the
            global business community by delivering advanced technology solutions that
            enable our clients to operate, interoperate and compete more effectively.
          </p>
          <p>
            CrownIT Solutions provides end-to-end business solutions that leverage
            technology and is experienced in Client Server, Mainframe, Web Development,
            Systems Design, Systems Administration, and Database Design.
          </p>
        </div>
      </section>

      <section className="section-light">
        <div className="container">
          <p className="overline" data-reveal>What drives us</p>
          <h2 className="section-heading" data-reveal>The goals of CITS</h2>
          <ul className="goal-list">
            {[
              'Provide our clients with talented and knowledgeable professionals.',
              'Encourage and promote employee growth and development.',
              "Expand employees' skills by supporting an active training and educational environment.",
              'Seek client assignments that allow employees to use skills required to remain competitive in the marketplace.',
            ].map((g) => (
              <li key={g} data-reveal>{g}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-white">
        <div className="container">
          <p className="overline" data-reveal>What we stand for</p>
          <h2 className="section-heading" data-reveal>Core Values</h2>
          <div className="values-grid">
            {values.map((v, i) => (
              <div className="value-card" key={v.label} data-reveal style={{ animationDelay: `${i * 0.07}s` }}>
                <h4>{v.label}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/* ── services ─────────────────────────────────────────────────── */
function ServicesPage() {
  useReveal()
  return (
    <>
      {/* Hero */}
      <section className="section-hero section-hero--sm">
        <div className="container">
          <p className="eyebrow" data-reveal>What We Offer</p>
          <h1 data-reveal>Services</h1>
          <p className="hero-lead" data-reveal>
            CrownIT Solutions provides software applications &amp; services for banking,
            insurance, manufacturing, financial, and biotechnology industries, with a
            special focus on solutions for the clinical research industry.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="section-white">
        <div className="container prose" data-reveal>
          <p>
            CrownIT Solutions' Professional Services allow our broad customer base to
            maximize the value of outsourcing technical development. With a range of
            skill sets and a flexible support network, CITS can quickly and
            cost-effectively supply individuals or teams to client-managed projects.
            We brand ourselves by the quality of our services and the quality of our
            deliverables. We spend a great amount of time and resources screening and
            hiring top quality consultants — allowing us to provide premier resources
            that meet and exceed our clients' expectations.
          </p>
          <p>
            Our services address specific needs of enterprise IT programs, communications
            and Internet technology product development, and engineering product design
            and data management. Clients benefit from seamless coordination across
            strategy, implementation, and management of their technology programs.
          </p>
          <p>
            Our vision is to be among the Global Technology Enablers and Service
            Providers — providing the full spectrum of our service model and being an
            integral part of the customer's success. Multiple skills and competencies
            combine to realize technology-driven business transformation.
          </p>
        </div>
      </section>

      {/* Staff Augmentation & Consulting */}
      <section className="section-light">
        <div className="container svc-section" data-reveal>
          <div className="svc-label">
            <p className="overline">Staff Augmentation &amp; Consulting</p>
            <h2 className="section-heading">Skilled Professionals with Industry Expertise</h2>
          </div>
          <div className="svc-body">
            <p>
              CrownIT Solutions Staff Augmentation services enable you to get qualified
              and experienced personnel to suit your requirements, working exclusively for
              you from our offices. It is a perfect way to accomplish your special or
              seasonal projects without adding a permanent staff.
            </p>
            <p>
              CITS is committed to providing customer-centric services that are highly
              effective and provide transparency with no hidden costs, out-of-pocket
              expenses, or additional taxes. CITS has insight, resources, and access to a
              global network of talent across technologies and industries to provide your
              company with the right consultants — just when you need them.
            </p>
            <p>
              CITS's strong proposition is its competent and vast resource pool, an
              extensive proprietary database coupled with the largest referral-based
              network. We leverage this to present multiple qualified applicants for your
              single position. CITS's proven recruitment methodology aids in bringing
              screened candidates on board even on short notice.
            </p>
            <p className="svc-tagline">Our Assets Are Our People</p>
          </div>
        </div>
      </section>

      {/* Project Management */}
      <section className="section-white">
        <div className="container svc-section svc-section--flip" data-reveal>
          <div className="svc-label">
            <p className="overline">Project Management</p>
            <h2 className="section-heading">Leveraging Experience and Technology</h2>
          </div>
          <div className="svc-body">
            <p>
              CrownIT Solutions has the tools and experience required to not only plot
              a clear course to sound business decisions by taking advantage of today's
              latest technologies, but also to implement them and run them on a
              day-to-day basis. These technologies provide solutions that cost-effectively
              increase productivity and create new business opportunities, while our
              outsourcing services give you the chance to lower the overall cost of
              ownership.
            </p>
            <p>
              We work closely with our clients to create, implement, and operate advanced
              business solutions that achieve the full potential of current and emerging
              technologies — as well as integrating these technologies with existing
              systems.
            </p>
            <p>
              CrownIT Solutions has a proven record in outsourcing the technical services
              necessary for businesses to stay ahead of their competitors. We have
              experience with a range of vendors, products, and technologies and are
              ready to provide your organization with a complete outsourcing solution that
              works best within your current system — or moves you ahead to an entirely
              new one. We offer a complete range of outsourcing services that can include
              standard application suites, 24/7/365 help desk, full outsourcing of all
              standard IT operations, and a detailed Service Level Agreement — all
              packaged together.
            </p>
          </div>
        </div>
      </section>

      {/* Software Development */}
      <section className="section-dark">
        <div className="container svc-section" data-reveal>
          <div className="svc-label">
            <p className="overline-light">Software Development Services</p>
            <h2 className="heading-light">Innovative Solutions for Complex Systems</h2>
          </div>
          <div className="svc-body">
            <p className="body-light">
              Adopting an offshore outsourcing model should be about more than seeking
              cost reductions — it should establish a framework to drive continuous
              improvement. CrownIT Solutions enables your business to leverage the
              combined benefits of IT Outsourcing (ITO) and Business Process Outsourcing
              (BPO) by adopting a unified view of your processes and applications.
            </p>
            <p className="body-light">
              Our application development and maintenance methodology helps with
              successful on-time deliverables that exceed expectations. Stringent quality
              procedures combined with benchmarked practices and experienced delivery
              skills help our clients get maximum return on their IT spending.
            </p>
            <p className="body-light">We work with you to:</p>
            <ul className="dark-list">
              {[
                'Outline the solution',
                'Define the solution architecture',
                'Develop prototypes for demos to users',
                'Design a framework for the solution',
                'Build the solution',
                'Validate the solution against requirements',
                'Provide continuous support for the solution',
                'Roll out the solution across your organization',
              ].map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

/* ── careers ──────────────────────────────────────────────────── */
function CareersPage() {
  useReveal()
  const subpages = [
    { to: '/careers/jobs', label: 'Current Job Openings', count: `${careersData.jobs.length} open roles`, desc: 'Browse active positions across software engineering, QA, and database administration.' },
    { to: '/careers/benefits', label: 'Employee Benefits', count: 'Comprehensive package', desc: 'Competitive pay, paid holidays, vacation time, and service awards.' },
    { to: '/careers/referral', label: 'Employee Referral Program', count: `Up to ${careersData.referral.bonusRange} bonus`, desc: 'Know someone great? Refer them and earn a bonus when they join the team.' },
  ]
  return (
    <>
      <section className="section-hero section-hero--sm">
        <div className="container">
          <p className="eyebrow" data-reveal>Join Our Team</p>
          <h1 data-reveal>Your new career starts here</h1>
        </div>
      </section>

      <section className="section-white">
        <div className="container two-col two-col--top" data-reveal>
          <div className="prose">
            <p>
              At CrownIT Solutions, we are always looking for talented individuals who
              share our passion for technology and client success. We are a family unit
              powered by diversity, inclusion, transparency, respect, integrity and
              passion for our clients and our people.
            </p>
            <p>
              If you are interested in joining our growing team, please email your
              resume to:
            </p>
            <a className="email-link" href="mailto:hr@crownits.com">hr@crownits.com</a>
          </div>
          <div>
            <h3 className="checklist-heading">Are you the right fit?</h3>
            <ul className="checklist">
              {[
                'Are you an ambitious IT professional?',
                'Do you want a career with a firm foundation?',
                'Do you want to achieve more and grow with a growing company?',
                'Do you look for lots of excitement at work?',
                'Are you creative and proactive?',
                'Do you possess excellent communication skills in English?',
              ].map((q) => <li key={q}>{q}</li>)}
            </ul>
            <p className="checklist-cta">If you answered yes — join us for your dream job.</p>
          </div>
        </div>
      </section>

      <section className="section-light">
        <div className="container">
          <p className="overline" data-reveal>Explore opportunities</p>
          <h2 className="section-heading" data-reveal>Life at CrownIT</h2>
          <div className="careers-subpage-grid">
            {subpages.map((sp, i) => (
              <NavLink to={sp.to} key={sp.to} className="careers-subpage-card" data-reveal style={{ animationDelay: `${i * 0.08}s` }}>
                <span className="careers-card-count">{sp.count}</span>
                <h3>{sp.label}</h3>
                <p>{sp.desc}</p>
                <span className="careers-card-arrow">View &rarr;</span>
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      <section className="section-accent">
        <div className="container cta-band" data-reveal>
          <p>Ready to take the next step? We'd love to hear from you.</p>
          <a className="btn-primary" href="mailto:hr@crownits.com">Send Your Resume</a>
        </div>
      </section>
    </>
  )
}

/* ── careers / job openings ───────────────────────────────────── */
function JobOpeningsPage() {
  useReveal()
  const [expanded, setExpanded] = useState(null)
  const toggle = (id) => setExpanded(prev => prev === id ? null : id)

  return (
    <>
      <section className="section-hero section-hero--sm">
        <div className="container">
          <p className="eyebrow" data-reveal>
            <NavLink to="/careers" className="breadcrumb-link">Careers</NavLink> &nbsp;/&nbsp; Job Openings
          </p>
          <h1 data-reveal>Current Job Openings</h1>
          <p className="hero-sub" data-reveal>
            {careersData.jobs.length} open positions &nbsp;·&nbsp; Headquarters: Dayton, OH &nbsp;·&nbsp; Multiple U.S. locations
          </p>
        </div>
      </section>

      <section className="section-white">
        <div className="container" data-reveal>
          <p className="jobs-intro">
            All positions are based at our Dayton, OH headquarters with travel and relocation to client sites throughout the U.S.
            To apply, send your resume to <a className="email-link" href="mailto:hr@crownits.com">hr@crownits.com</a>.
          </p>

          <div className="job-list">
            {careersData.jobs.map((job, i) => {
              const isOpen = expanded === job.id
              const dutyBullets = job.duties.split(';').map(s => s.trim()).filter(Boolean)
              return (
                <div key={job.id} className={`job-card${isOpen ? ' job-card--open' : ''}`}>
                  <button className="job-card-header" onClick={() => toggle(job.id)} aria-expanded={isOpen}>
                    <div className="job-card-meta">
                      <span className="job-posted">Posted {job.postedOn}</span>
                      <h3 className="job-title">{job.title}</h3>
                      <span className="job-location">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{marginRight:'4px',verticalAlign:'middle'}}>
                          <path d="M6 1a3.5 3.5 0 0 1 3.5 3.5C9.5 7.5 6 11 6 11S2.5 7.5 2.5 4.5A3.5 3.5 0 0 1 6 1Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                          <circle cx="6" cy="4.5" r="1.2" fill="currentColor"/>
                        </svg>
                        {job.location}
                      </span>
                    </div>
                    <span className={`job-toggle-icon${isOpen ? ' job-toggle-icon--open' : ''}`}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="job-card-body">
                      <div className="job-body-grid">
                        <div className="job-section job-section--duties">
                          <h4>Job Duties</h4>
                          <ul className="job-duties-list">
                            {dutyBullets.map((d, j) => <li key={j}>{d}.</li>)}
                          </ul>
                        </div>

                        <div className="job-sidebar">
                          <div className="job-section">
                            <h4>Tools &amp; Technologies</h4>
                            <div className="job-tags">
                              {job.tools.map(t => <span className="job-tag" key={t}>{t}</span>)}
                            </div>
                          </div>

                          <div className="job-section">
                            <h4>Minimum Qualifications</h4>
                            <ul className="job-req-list">
                              <li>
                                <span className="req-label">Education</span>
                                {job.requirements.education}
                              </li>
                              {job.requirements.experience && (
                                <li>
                                  <span className="req-label">Experience</span>
                                  {job.requirements.experience}
                                </li>
                              )}
                              <li>
                                <span className="req-label">Other</span>
                                {job.requirements.other}
                              </li>
                            </ul>
                          </div>

                          <div className="job-section">
                            <h4>Location</h4>
                            <p className="job-hq-info">
                              Opening through headquarters in <strong>{job.headquarters}</strong>.<br/>
                              Worksites: {job.location}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="job-apply-bar">
                        <span className="job-apply-note">Submit resume to apply for this position</span>
                        <a className="btn-primary" href={`mailto:${job.applyEmail}?subject=Application for ${job.title}`}>
                          Apply Now &rarr;
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

/* ── careers / benefits ───────────────────────────────────────── */
function BenefitsPage() {
  useReveal()
  return (
    <>
      <section className="section-hero section-hero--sm">
        <div className="container">
          <p className="eyebrow" data-reveal>
            <NavLink to="/careers" className="breadcrumb-link">Careers</NavLink> / Benefits
          </p>
          <h1 data-reveal>Comprehensive Employee Benefits</h1>
        </div>
      </section>

      <section className="section-white">
        <div className="container" data-reveal>
          <div className="prose prose--wide">
            <p className="lead">{careersData.benefits.intro}</p>
            <ul className="benefit-list">
              {careersData.benefits.items.map(item => (
                <li key={item}>
                  <span className="benefit-check">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-accent">
        <div className="container cta-band" data-reveal>
          <p>Join a team that invests in your growth and wellbeing.</p>
          <a className="btn-primary" href="mailto:hr@crownits.com">Get in Touch</a>
        </div>
      </section>
    </>
  )
}

/* ── careers / referral ───────────────────────────────────────── */
function ReferralPage() {
  useReveal()
  return (
    <>
      <section className="section-hero section-hero--sm">
        <div className="container">
          <p className="eyebrow" data-reveal>
            <NavLink to="/careers" className="breadcrumb-link">Careers</NavLink> / Referral Program
          </p>
          <h1 data-reveal>Employee Referral Program</h1>
          <p className="hero-sub" data-reveal>Earn {careersData.referral.bonusRange} for every successful referral</p>
        </div>
      </section>

      <section className="section-white">
        <div className="container" data-reveal>
          <div className="prose prose--wide">
            <p className="lead">{careersData.referral.intro}</p>
            <div className="faq-list">
              {careersData.referral.faqs.map((faq, i) => (
                <div className="faq-item" key={i}>
                  <h4 className="faq-q">{faq.question}</h4>
                  <p className="faq-a">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-accent">
        <div className="container cta-band" data-reveal>
          <p>Know someone who'd be a great fit? Refer them today.</p>
          <a className="btn-primary" href="mailto:hr@crownits.com">Submit a Referral</a>
        </div>
      </section>
    </>
  )
}

/* ── lca ──────────────────────────────────────────────────────── */
function LcaPage() {
  useReveal()
  return (
    <>
      <section className="section-hero section-hero--sm">
        <div className="container">
          <p className="eyebrow" data-reveal>Compliance & Transparency</p>
          <h1 data-reveal>LCA ETA 9035</h1>
        </div>
      </section>

      <section className="section-white">
        <div className="container" data-reveal>
          <p className="body-lg">H1B Certified Labor Condition Applications (ETA 9035)</p>
          <ul className="lca-list">
            {lcaLinks.map(([name, url]) => (
              <li key={name}>
                <a href={url} target="_blank" rel="noreferrer">
                  <span className="lca-name">{name}</span>
                  <span className="lca-badge">Certified LCA ↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

/* ── contact ──────────────────────────────────────────────────── */
function ContactPage() {
  useReveal()
  return (
    <>
      <section className="section-hero section-hero--sm">
        <div className="container">
          <p className="eyebrow" data-reveal>Reach Out</p>
          <h1 data-reveal>Contact Us</h1>
        </div>
      </section>

      <section className="section-white">
        <div className="container two-col two-col--top" data-reveal>
          <div className="prose">
            <p>
              Thank you for visiting CrownIT Solutions, LLC. For questions or inquiries
              please send us an email or contact us using the following information.
            </p>
            <div className="contact-block">
              <p><strong>Headquarters</strong></p>
              <p>10552 Success Lane, STE# K<br />Dayton, OH 45458</p>
              <p>Ph: (937) 886-6787<br />Fx: (215) 318-5343</p>
              <p><a href="mailto:hr@crownits.com">hr@crownits.com</a></p>
            </div>
            <div className="contact-block">
              <p><strong>Other Locations</strong></p>
              <p>Tampa, FL &nbsp;·&nbsp; Atlanta, GA</p>
            </div>
            <p className="contact-note">Please allow us 24–48 hours to respond.</p>
          </div>
          <div className="contact-form-placeholder" data-reveal>
            <h3>Let Us Contact You</h3>
            <p>
              Please reach out and we will get in touch shortly. Our secure email system
              guarantees your information is protected and all communications remain
              completely confidential.
            </p>
            <a className="btn-primary" href="mailto:hr@crownits.com">Send a Message</a>
          </div>
        </div>
      </section>
    </>
  )
}

/* ── terms ────────────────────────────────────────────────────── */
function TermsPage() {
  useReveal()
  return (
    <>
      <section className="section-hero section-hero--sm">
        <div className="container">
          <p className="eyebrow" data-reveal>Legal</p>
          <h1 data-reveal>Terms and Conditions</h1>
        </div>
      </section>
      <section className="section-white">
        <div className="container prose legal-prose" data-reveal>
          <h3>Who we are</h3>
          <p>Our website address is: https://crownits.com.</p>

          <h3>Tracking Activity on Our Site</h3>
          <p>
            When you browse crownits.com and have not registered for any online services,
            you browse anonymously. Personally identifiable information — such as your
            name, address, phone number, and e-mail address — is not collected as you
            browse. However, we track how our site is used by both anonymous visitors and
            registered customers via cookies, which collect server and browser information
            but cannot access your hard drive or capture personal data without consent.
          </p>

          <h3>Information We Collect</h3>
          <p>
            When you become a registered user on our site, you provide personal
            information such as your e-mail address and account number, enabling you to
            review confidential account information and perform transactions.
          </p>

          <h3>How We Use Personal Information</h3>
          <p>
            Once you are a registered crownits.com user, we use this information to
            deliver products and services you enroll in, process transactions you
            conduct on our website, and to customize your online experience.
          </p>

          <h3>Terms &amp; Conditions</h3>
          <p>
            This website is intended for personal, non-commercial use. Users may not
            modify, copy, distribute, transmit, display, perform, reproduce, publish,
            license, create derivative works from, transfer, or sell any information,
            products or services obtained from this site. CrownITs reserves the right
            to deny access to the website to anyone at any time. As a condition of use,
            the user agrees to indemnify CrownITs and its suppliers from and against
            any and all liabilities and damages arising out of claims resulting from
            use of this website.
          </p>
        </div>
      </section>
    </>
  )
}

/* ── privacy ──────────────────────────────────────────────────── */
function PrivacyPage() {
  useReveal()
  return (
    <>
      <section className="section-hero section-hero--sm">
        <div className="container">
          <p className="eyebrow" data-reveal>Legal</p>
          <h1 data-reveal>Privacy Policy</h1>
        </div>
      </section>
      <section className="section-white">
        <div className="container prose legal-prose" data-reveal>
          <h3>Who we are</h3>
          <p>
            CrownIT Solutions, LLC ("CrownITs") owns the website https://crownits.com.
            We respect your privacy and are committed to protecting it through our
            compliance with this policy. By accessing or using this website, you agree
            to this privacy policy.
          </p>

          <h3>Collection of Information</h3>
          <p>
            We collect personal information such as name, e-mail address, telephone
            number, company name, and title when you provide it to us — via contact
            forms, correspondence, or job applications. We also collect usage details,
            IP addresses, and cookie data automatically as you navigate the website.
          </p>

          <h3>Use of Information</h3>
          <p>We use collected information to:</p>
          <ul>
            <li>Present our website and its contents effectively.</li>
            <li>Provide and support our IT offerings.</li>
            <li>Process job applications.</li>
            <li>Improve website usability and maintenance.</li>
            <li>Prevent fraud and enhance security.</li>
            <li>Contact you with information that may be of interest to you.</li>
            <li>Maintain leads, run marketing campaigns, and create brand awareness.</li>
          </ul>

          <h3>Cookies and Technology</h3>
          <p>
            This website uses Google Analytics to track usage patterns. Cookies collect
            server and browser information but cannot retrieve personal data from your
            device. You may refuse cookies in your browser settings or opt out using the
            Google Analytics opt-out browser add-on.
          </p>

          <h3>How We Protect Personal Information</h3>
          <p>
            We have implemented measures designed to secure your personal information from
            accidental loss and unauthorized access, use, alteration, and disclosure.
            However, transmission of information via the internet is not completely secure.
            Any transmission of personal information is at your own risk.
          </p>

          <h3>Children's Privacy</h3>
          <p>We do not knowingly collect personal information from children under 13.</p>

          <h3>Changes to This Policy</h3>
          <p>
            Changes are posted on this page. Continued use of the website after changes
            are made constitutes acceptance of those changes.
          </p>
        </div>
      </section>
    </>
  )
}

/* ── 404 ──────────────────────────────────────────────────────── */
function NotFoundPage() {
  return (
    <section className="section-hero">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1>Page Not Found</h1>
        <p className="hero-lead">The page you requested does not exist.</p>
        <NavLink to="/" className="btn-primary">Back to Home</NavLink>
      </div>
    </section>
  )
}

/* ── router ───────────────────────────────────────────────────── */
export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/index.php/crownit-solutions/" element={<CompanyPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/jobs" element={<JobOpeningsPage />} />
        <Route path="/careers/benefits" element={<BenefitsPage />} />
        <Route path="/careers/referral" element={<ReferralPage />} />
        <Route path="/index.php/your-new-career-starts-here/" element={<CareersPage />} />
        <Route path="/index.php/current-job-openings/" element={<JobOpeningsPage />} />
        <Route path="/index.php/comprehensive-employee-benefits/" element={<BenefitsPage />} />
        <Route path="/index.php/employee-referral-program/" element={<ReferralPage />} />
        <Route path="/lca-eta-9035" element={<LcaPage />} />
        <Route path="/index.php/lca-eta-9035/" element={<LcaPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/index.php/crownit-solutions/contact-us/" element={<ContactPage />} />
        <Route path="/terms-and-conditions" element={<TermsPage />} />
        <Route path="/index.php/legal-information/" element={<TermsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="/index.php/privacy-policy-2/" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}
