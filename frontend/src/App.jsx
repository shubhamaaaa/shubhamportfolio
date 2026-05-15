// App.js (React Frontend)
import React, { useState, useEffect } from 'react';
import {
  FaCode, FaGraduationCap, FaBriefcase, FaStar,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub,
  FaLinkedin, FaTwitter, FaPaperPlane, FaExternalLinkAlt,
  FaBars, FaTimes, FaWhatsapp
} from 'react-icons/fa';
import './App.css';

// Project images (replace with your actual project images)
import project1 from './assets/MyinnersideGroup4.jpeg';
import project2 from './assets/1.jpg';
import project3 from './assets/BG.jpg';
import project4 from './assets/HOME1.jpg';
import project5 from './assets/Home-banner-1.webp';
import project6 from './assets/shanupg.jpeg';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState({ sending: false, sent: false, error: '' });
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let currentSection = 'home';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // In your contact form component
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (formStatus.sending) return;

    setFormStatus({ sending: true, sent: false, error: '' });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Handle rate limit errors
      if (response.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      }

      const data = await response.json();

      if (response.ok) {
        setFormStatus({ sending: false, sent: true, error: '' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus({ sending: false, sent: false, error: data.message || 'Error sending message' });
      }
    } catch (error) {
      setFormStatus({
        sending: false,
        sent: false,
        error: error.message || 'Network error. Please try again.'
      });
    }
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">Shubham<span>Shukla</span></div>
          <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
            <a
              href="#home"
              className={activeSection === 'home' ? 'active' : ''}
              onClick={() => scrollToSection('home')}
            >Home</a>
            <a
              href="#about"
              className={activeSection === 'about' ? 'active' : ''}
              onClick={() => scrollToSection('about')}
            >About</a>
            <a
              href="#experience"
              className={activeSection === 'experience' ? 'active' : ''}
              onClick={() => scrollToSection('experience')}
            >Experience</a>
            <a
              href="#skills"
              className={activeSection === 'skills' ? 'active' : ''}
              onClick={() => scrollToSection('skills')}
            >Skills</a>
            <a
              href="#projects"
              className={activeSection === 'projects' ? 'active' : ''}
              onClick={() => scrollToSection('projects')}
            >Projects</a>
            <a
              href="#contact"
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={() => scrollToSection('contact')}
            >Contact</a>
          </nav>
          <button className="menu-btn" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-background">
          <div className="particles">
            {[...Array(50)].map((_, i) => (
              <div key={i} className="particle" style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}></div>
            ))}
          </div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">Full Stack Developer</div>
              <h1>Transforming Ideas Into <span>Digital Reality</span></h1>
              <p>I design and develop responsive, user-friendly websites and applications using modern technologies like MERN Stack, Shopify, and more.</p>
              <div className="hero-buttons">
                <a href="#projects" className="btn">
                  <FaCode className="btn-icon" />
                  View My Work
                </a>
                <a href="#contact" className="btn btn-outline">
                  <FaPaperPlane className="btn-icon" />
                  Contact Me
                </a>
              </div>
              <div className="hero-social">
                <a href="www.linkedin.com/in/shubham-shukla-b480a726a"><FaLinkedin /></a>
                <a href="https://github.com/shubhamaaaa"><FaGithub /></a>


                <a href="https://wa.me/919335162135" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp />
                </a>
              </div>
            </div>
            <div className="hero-image">
              <div className="image-wrapper">
                <div className="profile-image">
                  <span>SS</span>
                </div>
                <div className="floating-element el-1"></div>
                <div className="floating-element el-2"></div>
                <div className="floating-element el-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* About Section */}
<section id="about" className="about">
 <div className="container">
    <div className="section-title">
      <h2>About Me</h2>
      <p>Passionate about building scalable digital experiences</p>
    </div>

    <div className="about-content">
      <div className="about-text">
        <h3>
          Hello! I'm <span className="highlight-text">Shubham Shukla</span>
        </h3>

        <p>
          I'm a passionate{" "}
          <span className="highlight-text">
            Full Stack Developer
          </span>{" "}
          and{" "}
          <span className="highlight-text">
            Web Designer
          </span>{" "}
          specializing in modern, scalable, and{" "}
          <span className="highlight-text">
            high-performance web applications
          </span>.
          With strong expertise in the{" "}
          <span className="highlight-text">MERN Stack</span>,{" "}
          <span className="highlight-text">Next.js</span>,{" "}
          <span className="highlight-text">Shopify</span>, and responsive{" "}
          <span className="highlight-text">UI/UX design</span>, I create
          digital products that combine functionality, performance, and
          exceptional user experience.
        </p>

        <p>
          I have hands-on experience developing{" "}
          <span className="highlight-text">
            production-ready e-commerce platforms
          </span>,
          business websites, admin dashboards, and custom web solutions with{" "}
          <span className="highlight-text">
            secure payment integrations
          </span>,
          optimized backend architectures, and{" "}
          <span className="highlight-text">
            SEO-focused frontend development
          </span>.
          My goal is to build impactful applications that help businesses grow
          efficiently in the digital space.
        </p>

        <p>
          I continuously explore modern technologies and best development
          practices to deliver{" "}
          <span className="highlight-text">
            clean, maintainable, and future-ready solutions
          </span>{" "}
          while solving complex technical challenges with creativity and
          precision.
        </p>

        <div className="about-stats">
          <div className="stat">
            <span className="stat-number highlight-text">250+</span>
            <span className="stat-label">DSA Problems Solved</span>
          </div>

          <div className="stat">
            <span className="stat-number highlight-text">32+</span>
            <span className="stat-label">Projects Built</span>
          </div>

          <div className="stat">
            <span className="stat-number highlight-text">5★</span>
            <span className="stat-label">HackerRank Java & SQL</span>
          <div className="experience-item">
            <div className="experience-header">
              <div>
                <h3>Web Designer</h3>
                <h4>Recreators Design and Media Pvt. Ltd.</h4>
              </div>
              <span className="experience-date">Nov 2024 – Present</span>
            </div>
            <ul>
              <li>Designed and developed multiple web projects using MERN Stack and Shopify.</li>
              <li>Built e-commerce websites with features like product management, secure payment integration (Stripe, Razorpay, COD), and responsive UIs.</li>
              <li>Designed and deployed Shopify websites, including Flickemart.</li>
              <li>Collaborated with cross-functional teams to deliver high-quality websites within deadlines.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="about-info">
        <div className="info-item">
          <FaGraduationCap className="info-icon" />
          <h4>Education</h4>
          <p>B.Tech in Computer Science</p>
          <p className="highlight">Strong Technical Foundation</p>
        </div>

        <div className="info-item">
          <FaBriefcase className="info-icon" />
          <h4>Experience</h4>
          <p>Full Stack Developer & Web Designer</p>
          <p className="highlight">Recreators Design</p>
        </div>

        <div className="info-item">
          <FaCode className="info-icon" />
          <h4>Core Technologies</h4>
          <p>MERN Stack, Next.js</p>
          <p className="highlight">Shopify & Tailwind CSS</p>
        </div>

        <div className="info-item">
          <FaStar className="info-icon" />
          <h4>Achievements</h4>
          <p>5★ HackerRank Ratings</p>
          <p className="highlight">Java & SQL</p>
        </div>
      </div>
    </div>
  </div>
  </div>
</section>

{/* Experience Section */}
<section id="experience" className="experience">
  <div className="container">
    <div className="section-title">
      <h2>My Experience</h2>
      <p>Professional journey and real-world development experience</p>
    </div>

    <div className="experience-item">
      <div className="experience-header">
        <div>
          <h3>
            <span className="highlight-text">
              Full Stack Developer & Web Designer
            </span>
          </h3>

          <h4>
            <span className="highlight-text">
              Recreators Design and Media Pvt. Ltd.
            </span>
          </h4>
        </div>

        <span className="experience-date">
          Nov 2024 – Present
        </span>
      </div>

      <ul>
        <li>
          Designed and developed scalable, high-performance web applications
          using <span className="highlight-text">MERN Stack</span>,{" "}
          <span className="highlight-text">Next.js</span>, and{" "}
          <span className="highlight-text">Shopify</span> for diverse business
          requirements.
        </li>

        <li>
          Built modern e-commerce platforms with{" "}
          <span className="highlight-text">
            secure payment gateway integrations
          </span>,
          referral systems, automated workflows, and{" "}
          <span className="highlight-text">
            real-time SMS/WhatsApp notifications
          </span>.
        </li>

        <li >
          Optimized backend performance using{" "}
          <span className="highlight-text">Redis caching</span>,{" "}
          <span className="highlight-text">asynchronous job queues</span>, and
          efficient database management techniques to improve scalability and
          server efficiency.
        </li>

        <li>
          Delivered production-ready{" "}
          <span className="highlight-text">Shopify</span> and{" "}
          <span className="highlight-text">React/Next.js</span> projects,
          including{" "}
          <span className="highlight-text">Flickemart</span> and{" "}
          <span className="highlight-text">Riarmart</span>, while maintaining
          high-quality development standards and timely delivery.
        </li>

        <li>
          Developed secure{" "}
          <span className="highlight-text">RESTful APIs</span>,
          authentication systems,{" "}
          <span className="highlight-text">
            role-based access control
          </span>,
          and dynamic admin dashboards to streamline business operations.
        </li>

        <li>
          Collaborated directly with clients and cross-functional teams to
          transform business requirements into{" "}
          <span className="highlight-text">
            intuitive, user-centric digital solutions
          </span>.
        </li>

        <li>
          Improved website performance,{" "}
          <span className="highlight-text">SEO</span>, responsiveness, and user
          engagement through optimized frontend architecture using{" "}
          <span className="highlight-text">React.js</span>,{" "}
          <span className="highlight-text">Next.js</span>, and{" "}
          <span className="highlight-text">Tailwind CSS</span>.
        </li>

        <li>
          Demonstrated strong problem-solving abilities by debugging complex
          technical issues and implementing{" "}
          <span className="highlight-text">
            scalable, reliable, and maintainable solutions
          </span>{" "}
          under tight deadlines.
        </li>
      </ul>
    </div>
  </div>
</section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <div className="section-title">
            <h2>My Skills</h2>
            <p>Technologies I work with</p>
          </div>
          <div className="skills-container">
            <div className="skill-category">
              <h3>Languages</h3>
              <div className="skills-grid">
                <div className="skill-item">
                  <div className="skill-name">Java</div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-name">Python</div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-name">JavaScript</div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="skill-category">
              <h3>Frontend Development</h3>
              <div className="skills-grid">
                <div className="skill-item">
                  <div className="skill-name">React JS</div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-name">Next.js</div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-name">Tailwind CSS</div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '88%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="skill-category">
              <h3>Backend Development</h3>
              <div className="skills-grid">
                <div className="skill-item">
                  <div className="skill-name">Node.js</div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '87%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-name">Express.js</div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-name">MongoDB</div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '83%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="skill-category">
              <h3>Data Analysis</h3>
              <div className="skills-grid">
                <div className="skill-item">
                  <div className="skill-name">Pandas</div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-name">Power BI</div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-name">Excel</div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <div className="section-title">
            <h2>My Projects</h2>
            <p>A selection of my recent work</p>
          </div>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-img">
                <img src={project1} alt="My Inner Side Project" />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href="https://myinnerside.com/" className="project-link">
                      <FaExternalLinkAlt />
                    </a>
                    <a href="#" className="project-link">
                      <FaGithub />
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3>My Inner Side</h3>
                <p>A personalized consultation platform offering one-on-one sessions with certified professionals for meaningful and empathetic listening.</p>
                <div className="project-tech">
                  <span>React JS</span>
                  <span>MongoDB</span>
                  <span>Tailwind</span>
                  <span>Express</span>
                  <span>Razorpay</span>
                </div>
              </div>
            </div>
            <div className="project-card">
              <div className="project-img">
                <img src={project2} alt="Ishmi Herbal Project" />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href="https://ishmiherbal.com/" className="project-link">
                      <FaExternalLinkAlt />
                    </a>
                    <a href="#" className="project-link">
                      <FaGithub />
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3>Ishmi Herbal</h3>
                <p>Built a responsive herbal product marketplace with a dynamic product catalog, user authentication, and secure payment integration.</p>
                <div className="project-tech">
                  <span>React JS</span>
                  <span>MongoDB</span>
                  <span>Tailwind</span>
                  <span>Express</span>
                  <span>Node JS</span>
                </div>
              </div>
            </div>
            <div className="project-card">
              <div className="project-img">
                <img src={project3} alt="Rogue0707 Project" />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href="https://www.rogue0707.com/" className="project-link">
                      <FaExternalLinkAlt />
                    </a>
                    <a href="#" className="project-link">
                      <FaGithub />
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3>Rogue0707</h3>
                <p>Built a modern e-commerce platform for clothing and accessories using React.js frontend with a Shopify GraphQL backend.</p>
                <div className="project-tech">
                  <span>React</span>
                  <span>Shopify</span>
                  <span>GraphQL</span>
                </div>
              </div>
            </div>
            <div className="project-card">
              <div className="project-img">
                <img src={project4} alt="HealthStory Project" />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href="https://healthstory.net.in/" className="project-link">
                      <FaExternalLinkAlt />
                    </a>
                    <a href="#" className="project-link">
                      <FaGithub />
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3>HealthStory</h3>
                <p>Developed a wellness-focused e-commerce platform with a curated herbal/nutritional product catalog and seamless payment integration.</p>
                <div className="project-tech">
                  <span>React JS</span>
                  <span>MongoDB</span>
                  <span>Express</span>
                  <span>Node JS</span>
                </div>
              </div>


            </div>

            <div className="project-card">
              <div className="project-img">
                <img src={project5} alt="HealthStory Project" />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href="https://prakritisa.com/" className="project-link">
                      <FaExternalLinkAlt />
                    </a>
                    <a href="#" className="project-link">
                      <FaGithub />
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3>Prakritisa</h3>
                <p>Developed and contributed to Prakritisa.com, an e-commerce website for natural and botanical products, focusing on responsive design, smooth user experience, and secure checkout functionality.</p>
                <div className="project-tech">
                  <span>React JS</span>
                  <span>MongoDB</span>
                  <span>Express</span>
                  <span>Node JS</span>
                </div>
              </div>


            </div>


            <div className="project-card">
              <div className="project-img">
                <img src={project6} alt="HealthStory Project" />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href="https://shanupg-frontend.vercel.app/" className="project-link">
                      <FaExternalLinkAlt />
                    </a>
                    <a href="#" className="project-link">
                      <FaGithub />
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3>ShanuPg</h3>
                <p>Developed and deployed shanupg-frontend.vercel.app using React, Vite, and Tailwind CSS. Focused on building a clean, responsive interface with smooth navigation, hosted on Vercel for fast and reliable performance..</p>
                <div className="project-tech">
                  <span>React JS</span>
                  <span>MongoDB</span>
                  <span>Express</span>
                  <span>Node JS</span>
                </div>
              </div>


            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-title">
            <h2>Contact Me</h2>
            <p>Get in touch</p>
          </div>
          <div className="contact-container">
            <div className="contact-info">
              <h3>Let's talk about your project</h3>
              <p>I'm available for freelance work and interesting project opportunities.</p>
              <div className="contact-details">
                <div className="contact-item">
                  <FaPhone className="contact-icon" />
                  <div>
                    <h4>Phone</h4>
                    <a href="tel:+919335162135" className="text-blue-600 hover:underline">
                      +91 9335162135
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <FaEnvelope className="contact-icon" />
                  <div>
                    <h4>Email</h4>
                    <a href="mailto:shubshukla2332@gmail.com" className="text-blue-600 hover:underline">
                      shubshukla2332@gmail.com
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <FaMapMarkerAlt className="contact-icon" />
                  <div>
                    <h4>Location</h4>
                    <p>Ghaziabad, Uttar Pradesh, India</p>
                  </div>
                </div>
              </div>

              <div className="contact-social">
                <h4>Follow me</h4>
                <div className="social-links">
                  <a href="www.linkedin.com/in/shubham-shukla-b480a726a"><FaLinkedin /></a>
                  <a href="https://github.com/shubhamaaaa"><FaGithub /></a>


                  <a href="https://wa.me/919335162135" target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp />
                  </a>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Enter your message"
                    required
                  ></textarea>
                </div>
                {formStatus.error && <div className="error-message">{formStatus.error}</div>}
                {formStatus.sent && <div className="success-message">Message sent successfully! I'll get back to you soon.</div>}
                <button type="submit" className="btn" disabled={formStatus.sending}>
                  {formStatus.sending ? 'Sending...' : 'Send Message'}
                  <FaPaperPlane className="btn-icon" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="logo">Shubham<span>Shukla</span></div>
            <p>Full Stack Developer & Web Designer</p>
            <div className="social-links">
              <a href="www.linkedin.com/in/shubham-shukla-b480a726a"><FaLinkedin /></a>
              <a href="https://github.com/shubhamaaaa"><FaGithub /></a>


              <a href="https://wa.me/919335162135" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Shubham Shukla. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
