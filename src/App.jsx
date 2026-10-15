import { useEffect, useState } from 'react';
import { Menu, Star, X } from 'lucide-react';
import { toast } from 'react-toastify';
import technologyDataUrl from './data/technologies.json?url';

const gradientStyle = { backgroundImage: 'var(--brand-gradient)' };

function Brand({ compact = false }) {
  return <a className="brand" href="#home" aria-label="Dev Stack home">
    <span className="brand-mark">DS</span>
    {!compact && <span className="brand-name"><strong>Dev</strong> <em>Stack</em></span>}
  </a>;
}

function TechnologyCard({ tech, isAdded, onAdd }) {
  return <article className="tech-card">
    <div className="card-topline">
      <img src={tech.icon} alt="" className="tech-icon" />
      <span className="badge">{tech.badge}</span>
    </div>
    <h3>{tech.name}</h3>
    <p>{tech.description}</p>
    <div className="card-meta">
      <span className="category">{tech.category}</span>
      <span>{tech.difficulty}</span>
      <span className="rating"><Star size={13} fill="currentColor" /> {tech.rating}</span>
    </div>
    <button className={`stack-button ${isAdded ? 'added' : ''}`} disabled={isAdded} onClick={() => onAdd(tech)}>
      {isAdded ? '✓ Added to Stack' : 'Add to Stack'}
    </button>
  </article>;
}

function StackPanel({ selected, onRemove, onRemoveAll }) {
  return <aside className="stack-panel">
    <h2>Your Stack</h2>
    <p className="selection-count">{selected.length ? `${selected.length} ${selected.length === 1 ? 'Technology' : 'Technologies'} Selected` : 'No technologies selected yet.'}</p>
    {selected.length === 0 ? (
      <div className="empty-stack">Your stack is empty.</div>
    ) : (
      <>
        <div className="stack-list">
          {selected.map((tech) => <div className="stack-item" key={tech.id}>
            <img src={tech.icon} alt="" className="stack-icon" />
            <div><strong>{tech.name}</strong><span>{tech.category}</span></div>
            <button className="remove-icon" onClick={() => onRemove(tech)} aria-label={`Remove ${tech.name}`}><X size={19} /></button>
          </div>)}
        </div>
        <button className="remove-all" onClick={onRemoveAll}>Remove All</button>
      </>
    )}
  </aside>;
}

function App() {
  const [technologies, setTechnologies] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch(technologyDataUrl)
      .then((response) => response.json())
      .then((data) => setTechnologies(data))
      .catch(() => toast.error('Technology data could not be loaded.'))
      .finally(() => setLoading(false));
  }, []);

  const addTechnology = (tech) => {
    if (selected.some((item) => item.id === tech.id)) {
      toast.warn(`${tech.name} is already in your stack.`);
      return;
    }
    setSelected((items) => [...items, tech]);
    toast.success(`${tech.name} added to your stack.`);
  };
  const removeTechnology = (tech) => {
    setSelected((items) => items.filter((item) => item.id !== tech.id));
    toast.info(`${tech.name} removed from your stack.`);
  };
  const removeAll = () => {
    if (!selected.length) return;
    setSelected([]);
    toast.info('Your stack has been cleared.');
  };
  const scrollToTechnologies = () => document.querySelector('#technologies')?.scrollIntoView({ behavior: 'smooth' });

  return <>
    <header className="navbar">
      <div className="nav-inner">
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><Menu size={24} /></button>
        <Brand />
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          {['Home', 'Technologies', 'Projects', 'About', 'Contact'].map((item) => <a key={item} href={item === 'Home' ? '#home' : item === 'Technologies' ? '#technologies' : '#footer'} onClick={() => setMenuOpen(false)}>{item}</a>)}
        </nav>
        <div className="auth-actions"><button className="sign-in">Sign In</button><button className="sign-up" style={gradientStyle}>Sign Up</button></div>
      </div>
    </header>

    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <h1>Build Your Ideal <span>Development Stack</span></h1>
          <p>Explore frontend, backend, database, and tooling options. Compare them side by side and put together the stack that fits your next project.</p>
          <div className="hero-actions"><button className="primary-button" style={gradientStyle} onClick={scrollToTechnologies}>Explore Technologies</button><a className="secondary-button" href="#footer">Learn More</a></div>
        </div>
        <div className="hero-image"><img src="/assets/banner-stack.png" alt="Colorful three-dimensional development stack illustration" /></div>
      </section>

      <section className="explore section-wrap" id="technologies">
        <div className="section-heading"><h2>Explore the <span>Technologies</span></h2><p>Pick one technology per category to build your ideal stack.</p></div>
        <div className="builder-layout">
          <div className="technology-area">
            {loading ? <div className="loading"><i /> Loading technology collection…</div> : <div className="technology-grid">{technologies.map((tech) => <TechnologyCard key={tech.id} tech={tech} isAdded={selected.some((item) => item.id === tech.id)} onAdd={addTechnology} />)}</div>}
          </div>
          <StackPanel selected={selected} onRemove={removeTechnology} onRemoveAll={removeAll} />
        </div>
      </section>
    </main>

    <footer id="footer"><div className="footer-inner section-wrap">
      <div className="footer-brand"><Brand /><p>Curated tools, technologies, and resources for developers building modern software.</p><div className="socials"><a href="https://github.com">GitHub</a><a href="https://twitter.com">Twitter</a><a href="https://linkedin.com">LinkedIn</a></div></div>
      <div className="footer-links"><div><h3>Product</h3><a href="#home">Home</a><a href="#technologies">Technologies</a><a href="#footer">Projects</a></div><div><h3>Company</h3><a href="#footer">About</a><a href="#footer">Contact</a><a href="#footer">Careers</a></div><div><h3>Legal</h3><a href="#footer">Privacy Policy</a><a href="#footer">Terms of Service</a></div></div>
    </div><div className="bottom-bar section-wrap"><span>© 2026 Dev Stack. All rights reserved.</span><div><a href="#footer">Privacy</a><a href="#footer">Terms</a></div></div></footer>
  </>;
}

export default App;
