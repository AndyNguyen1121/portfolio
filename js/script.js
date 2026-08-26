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