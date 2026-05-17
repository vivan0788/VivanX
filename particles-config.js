// Particles configuration for portfolio
const particlesConfig = {
  particles: {
    number: { value: 50, density: { enable: true, value_area: 900 } },
    color: { value: ["#4f8ef7", "#7c3aed", "#06d6a0"] },
    shape: { type: "circle" },
    opacity: { value: 0.25, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.05, sync: false } },
    size: { value: 3, random: true, anim: { enable: false } },
    line_linked: { enable: true, distance: 150, color: "#4f8ef7", opacity: 0.1, width: 1 },
    move: { enable: true, speed: 1.2, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
  },
  interactivity: {
    detect_on: "canvas",
    events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
    modes: { grab: { distance: 140, line_linked: { opacity: 0.5 } }, push: { particles_nb: 3 } }
  },
  retina_detect: true
};

if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
  particlesJS('particles-js', particlesConfig);
}
