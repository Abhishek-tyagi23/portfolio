// Loader fix
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
});

// Navbar scroll + active


const navbar = document.querySelector(".custom-navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

/* Scroll Navbar */
function handleNavbar(){
  if(window.scrollY > 50){
    navbar.classList.add("scrolled");
  }else{
    navbar.classList.remove("scrolled");
  }
}

/* Active Link */
function setActiveLink(){

  let current = "hero";

  sections.forEach(section => {

    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.clientHeight;

    if(
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ){
      current = section.getAttribute("id");
    }

  });

  navLinks.forEach(link => {

    link.classList.remove("active");

    if(link.getAttribute("href") === `#${current}`){
      link.classList.add("active");
    }

  });
}

/* Events */
window.addEventListener("scroll", () => {
  handleNavbar();
  setActiveLink();
});

/* Default Active On Refresh */
window.addEventListener("load", () => {
  handleNavbar();
  setActiveLink();
});

/* Smooth Scroll */
navLinks.forEach(link => {

  link.addEventListener("click", function(e){

    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if(targetSection){

      window.scrollTo({
        top: targetSection.offsetTop - 70,
        behavior: "smooth"
      });

    }

  });

});

// End Navbar

// ✅ SINGLE Typing (fixed)
const roles = [
  "Full Stack Developer",
  "Building Real Products",
  "Python | Django | React"
];

let i = 0, j = 0, del = false;

function typeEffect() {
  const el = document.getElementById("typing");
  if (!el) return;

  let word = roles[i];
  el.innerText = word.substring(0, j);

  if (!del) j++;
  else j--;

  if (j === word.length) del = true;
  if (j === 0) {
    del = false;
    i = (i + 1) % roles.length;
  }

  setTimeout(typeEffect, 200);
}

document.addEventListener("DOMContentLoaded", typeEffect);


// Top button
const btn = document.getElementById("topBtn");
window.addEventListener("scroll", () => {
  if (btn) btn.style.display = window.scrollY > 300 ? "block" : "none";
});

if (btn) {
  btn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
}

// GSAP FIX (correct class)
if (window.gsap) {
  gsap.from(".hero-title", { y: 50, opacity: 0, duration: 1 });
  gsap.from(".hero-typing", { opacity: 0, delay: 0.5 });
}

// AOS
if (window.AOS) {
  AOS.init();
}

// Particles FIX
// ... tumhara pura existing JS code ...

// ===== PARTICLES =====
const canvas = document.getElementById("particles");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  for (let k = 0; k < 60; k++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.fillStyle = "#a855f7";
      ctx.fillRect(p.x, p.y, 2, 2);
      p.y += 0.4;
      if (p.y > canvas.height) p.y = 0;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ✅ ADD THIS BELOW (end of file) */
window.addEventListener("resize", () => {
  const canvas = document.getElementById("particles");
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});

// ===== SMOOTH GLOW =====
const glow = document.querySelector(".cursor-glow");

let mouseX = 0, mouseY = 0;
let posX = 0, posY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateGlow() {
  posX += (mouseX - posX) * 0.15;
  posY += (mouseY - posY) * 0.15;

  if (glow) {
    glow.style.left = posX + "px";
    glow.style.top = posY + "px";
  }

  requestAnimationFrame(animateGlow);
}
animateGlow();


// ===== PARALLAX =====

// ===== SOFT 3D PARALLAX =====
const card = document.getElementById("parallax-card");

if (card) {
  document.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    // 🔥 REDUCED intensity (important change)
    const rotateX = -(y - midY) / 30;
    const rotateY = (x - midX) / 30;

  card.style.transform =
`rotateX(${rotateX * 0.9}deg)
 rotateY(${rotateY * 0.9}deg)
 scale(1.01)`;

    // light follow
    card.style.setProperty("--x", x + "px");
    card.style.setProperty("--y", y + "px");
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
}

// ===== HACKER TERMINAL EFFECT =====

const terminal = document.getElementById("terminal");

const lines = [
  { text: "$ initializing system...", class: "cmd" },
  { text: "Loading modules...", class: "text" },
  { text: "Connecting to server...", class: "text" },
  { text: "✔ Connection established", class: "success" },
  { text: "", class: "text" },

  { text: "const dev = 'Abhishek';", class: "warning" },
  { text: "function build() {", class: "warning" },
  { text: "  return 'Scalable Apps';", class: "text" },
  { text: "}", class: "warning" },

  { text: "", class: "text" },
  { text: "✔ Portfolio Ready", class: "success" }
];

let lineIndex = 0;

function startTerminal() {
  if (!terminal) return;

  terminal.innerHTML = ""; // clear
  lineIndex = 0;

  typeLine();
}

function typeLine() {
  if (lineIndex >= lines.length) {
    setTimeout(startTerminal, 1500); // 🔁 restart
    return;
  }

  const line = document.createElement("div");
  line.classList.add("code-line", lines[lineIndex].class);

  let charIndex = 0;
  const text = lines[lineIndex].text;

  function typeChar() {
    if (charIndex < text.length) {
      line.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(typeChar, 18);
    } else {
      terminal.appendChild(line);
      lineIndex++;
      setTimeout(typeLine, 250);
    }
  }

  typeChar();
}

window.addEventListener("load", () => {
  setTimeout(startTerminal, 500);
});



// ======================================
//        CONTACT FORM VALIDATION
// ======================================

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {

  // STOP DEFAULT SUBMIT

  e.preventDefault();

  // ======================================
  // INPUTS
  // ======================================

  const name =
    document.getElementById("name").value.trim();

  const email =
    document.getElementById("email").value.trim();

  const phone =
    document.getElementById("phone").value.trim();

  const subject =
    document.getElementById("subject").value.trim();

  const message =
    document.getElementById("message").value.trim();

  // ======================================
  // REGEX
  // ======================================

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const phonePattern =
    /^[0-9]{10}$/;

  // ======================================
  // VALIDATION
  // ======================================

  if (name.length < 3) {

    alert("Name must be at least 3 characters");

    return;

  }

  if (!emailPattern.test(email)) {

    alert("Please enter a valid email");

    return;

  }

  if (!phonePattern.test(phone)) {

    alert("Phone number must be 10 digits");

    return;

  }

  if (subject.length < 4) {

    alert("Subject must be at least 4 characters");

    return;

  }

  if (message.length < 15) {

    alert("Message must be at least 15 characters");

    return;

  }

  // ======================================
  // EMAIL SEND
  // ======================================

  emailjs.send(

    "service_zeupn1c",
    "template_43r3ogr",

    {
      from_name: name,
      from_email: email,
      phone_number: phone,
      subject: subject,
      message: message
    },

    "P3sbbQghJVk0W2wdW"

  )

  .then(function () {

    alert("Message sent successfully ✅");

    contactForm.reset();

  })

  .catch(function (error) {

    alert("Failed to send message ❌");

    console.log(error);

  });

});