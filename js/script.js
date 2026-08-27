if (document.getElementById('my-work-link')) {
  document.getElementById('my-work-link').addEventListener('click', () => {
    document.getElementById('my-work-section').scrollIntoView({behavior: "smooth"})
  })
}

// Sidebar active-link tracking
const sidebarLinks = document.querySelectorAll(".sidebar-link");
const sections = Array.from(sidebarLinks).map(link =>
  document.querySelector(link.getAttribute("href"))
);

function setActiveLink(link) {
  sidebarLinks.forEach(l => l.classList.remove("active"));
  link.classList.add("active");
}

// 1. Update immediately on click, don't wait for scroll to catch up
sidebarLinks.forEach(link => {
  link.addEventListener("click", () => {
    setActiveLink(link);
  });
});

// 2. Update on scroll, based on which section is in view
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const matchingLink = document.querySelector(
          `.sidebar-link[href="#${entry.target.id}"]`
        );
        if (matchingLink) setActiveLink(matchingLink);
      }
    });
  },
  {
    // Triggers when a section is roughly in the upper-middle of the viewport
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0
  }
);

sections.forEach(section => {
  if (section) observer.observe(section);
});

if (sidebarLinks.length > 0) {
  setActiveLink(sidebarLinks[0]);
}

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

if (lightbox && lightboxImg) {
  document.querySelectorAll(".zoomable").forEach(img => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.classList.add("active");
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });
}

class ProjectCard extends HTMLElement {
  connectedCallback() {
    const image = this.getAttribute('image');
    const title = this.getAttribute('title');
    const itchUrl = this.getAttribute('itch-url');
    const githubUrl = this.getAttribute('github-url');
    const description = this.getAttribute('description');
    const pageUrl = this.getAttribute('page-url');

    // Apply the card's styling class directly to the custom element itself
    this.classList.add('project-card');

    this.innerHTML = `
      <img src="${image}" class="project-image">
      <div class="project-card-text-container">
        <div class="subheader-text">${title}
          <div id="icon-project">
            ${itchUrl ? `<a class="icon-link" target="_blank" href="${itchUrl}">
              <image src="./assets/icons/itchio-textless-white.svg" class="regular-icon"/>
            </a>` : ''}
            ${githubUrl ? `<a class="icon-link" target="_blank" href="${githubUrl}">
              <image src="./assets/icons/github-white-icon.svg" class="regular-icon"/>
            </a>` : ''}
          </div>
        </div>
        <div class="body-text project-card-text">${description}</div>
      </div>
      <a class="button" href="${pageUrl}">
        <span class="button-text">Read More</span>
        <image src="./assets/icons/arrow-right.svg" class="right-arrow-icon"/>
      </a>
    `;
  }
}

customElements.define('project-card', ProjectCard);