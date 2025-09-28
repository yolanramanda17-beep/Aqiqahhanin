const rootElement = document.querySelector(":root");
const audioIconWrapper = document.querySelector(".audio-icon-wrapper");
const audioIcon = document.querySelector(".audio-icon-wrapper i");
const song = document.querySelector("#song");
let isPlaying = false;

// Menonaktifkan scroll
function disableScroll() {
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  window.onscroll = function () {
    window.scrollTo(scrollTop, scrollLeft);
  };

  rootElement.style.scrollBehavior = "auto";
}
1;

// Mengaktifkan scroll dan memulai audio
function enableScroll() {
  window.onscroll = function () {};
  rootElement.style.scrollBehavior = "smooth";
  playAudio();
}

// Memutar audio
function playAudio() {
  audioIconWrapper.style.display = "flex";
  song.play();
  isPlaying = true;
}

// Menangani klik pada ikon audio
audioIconWrapper.onclick = function () {
  if (isPlaying) {
    song.pause();
    audioIcon.classList.remove("bi-disc");
    audioIcon.classList.add("bi-pause-circle");
  } else {
    song.play();
    audioIcon.classList.add("bi-disc");
    audioIcon.classList.remove("bi-pause-circle");
  }

  isPlaying = !isPlaying;
};

// Menonaktifkan scroll saat halaman dimuat
disableScroll();

// Menampilkan Nama dari URL dan Mengisi Input
const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get("n") || "Penerima Undangan"; // Mengambil nama dari parameter url
const namaContainer2 = document.querySelector(".hero h4 span");
namaContainer2.innerText = `${nama}`.replace(/ ,$/, ","); // Menampilkan nama dan kata ganti di elemen

document.querySelector("#nama").value = nama; // Mengiis nilai input dengan nama

// Animasi
// script.js
document
  .getElementById("viewInvitation")
  .addEventListener("click", function () {
    const invitationSection = document.getElementById("hero");
    const homeSection = document.getElementById("home");

    // Tambahkan kelas animasi ke section undangan
    invitationSection.classList.add("animate-out");

    // Tambahkan kelas untuk mencegah scroll
    document.body.classList.add("no-scroll");

    // Tunggu animasi selesai, lalu sembunyikan section undangan dan tampilkan section home
    setTimeout(() => {
      // Sembunyikan section undangan sepenuhnya
      invitationSection.style.display = "none";

      // Tampilkan section home
      homeSection.style.display = "block";
      homeSection.classList.add("show");

      // Gulir halaman ke atas
      window.scrollTo(0, 0);

      // Kembalikan scroll ke keadaan normal
      document.body.classList.remove("no-scroll");
    }, 1001); // Sesuaikan dengan durasi animasi
  });

// Menangani Pengiriman Formulir
window.addEventListener("load", function () {
  const form = document.getElementById("my-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Mencegah pengiriman form default
    const data = new FormData(form); // mengambil data dari formulir
    const action = e.target.action; // Mendapatkan URL untuk pengirim formuler
    fetch(action, {
      method: "POST",
      body: data,
    }).then(() => {
      alert("Konfirmasi Kehadiran Berhasil Terkirim!"); // Menampilkan pesan setelah formulir dikirim
    });
  });
});

// Particle
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

let particlesArray;

// Adjust canvas size to fit the screen
function initCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", initCanvasSize);

initCanvasSize(); // Initial setup

// Create particle
class Particle {
  constructor(x, y, size, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Check for particles out of canvas bounds and reposition
    if (this.size > 0.2) this.size -= 0.02; // Gradual shrink
    if (
      this.x + this.size < 0 ||
      this.x - this.size > canvas.width ||
      this.y + this.size < 0 ||
      this.y - this.size > canvas.height
    ) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 2;
      this.speedX = Math.random() * 0.6 - 0.3;
      this.speedY = Math.random() * 0.6 - 0.3;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.fill();
  }
}

// Initialize particle array
function initParticles() {
  particlesArray = [];
  let numberOfParticles = (canvas.width * canvas.height) / 5000; // Menambah densitas partikel
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 3 + 2;
    let x = Math.random() * (canvas.width - size * 2);
    let y = Math.random() * (canvas.height - size * 2);
    let speedX = Math.random() * 0.6 - 0.3;
    let speedY = Math.random() * 0.6 - 0.3;
    particlesArray.push(new Particle(x, y, size, speedX, speedY));
  }
}

// Animate particles
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
