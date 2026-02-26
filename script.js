document.addEventListener("DOMContentLoaded", function () {

    /* ============================= */
    /* Dark Mode */
    /* ============================= */
    function toggleMode() {
        document.body.classList.toggle("light");
    }
    window.toggleMode = toggleMode;


    /* ============================= */
    /* Typing Animation */
    /* ============================= */
    const roles = ["AI Engineer", "ML Developer", "Deep Learning Explorer"];
    let i = 0, j = 0, current = "", deleting = false;

    function type() {
        const el = document.getElementById("typing");
        if (!el) return;

        if (!deleting && j <= roles[i].length) {
            current = roles[i].substring(0, j++);
        } else if (deleting && j >= 0) {
            current = roles[i].substring(0, j--);
        }

        el.textContent = current;

        if (j === roles[i].length) deleting = true;
        if (deleting && j === 0) {
            deleting = false;
            i = (i + 1) % roles.length;
        }

        setTimeout(type, 100);
    }
    type();


    /* ============================= */
    /* Skills Animation */
    /* ============================= */
    window.addEventListener("scroll", () => {
        document.querySelectorAll(".progress span").forEach(bar => {
            if (bar.getBoundingClientRect().top < window.innerHeight) {
                bar.style.width = bar.getAttribute("data-width");
            }
        });
    });


    /* ============================= */
    /* Modal */
    /* ============================= */
    window.openModal = function (img, title) {
        document.getElementById("modal").style.display = "flex";
        document.getElementById("modal-img").src = img;
        document.getElementById("modal-title").innerText = title;
    };

    window.closeModal = function () {
        document.getElementById("modal").style.display = "none";
    };


    /* ============================= */
    /* Particles */
    /* ============================= */
    const canvas = document.getElementById("particles");
    if (canvas) {
        const ctx = canvas.getContext("2d");

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        let particles = [];

        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: 2,
                dx: (Math.random() - 0.5),
                dy: (Math.random() - 0.5)
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = getComputedStyle(document.body)
                    .getPropertyValue('--accent');
                ctx.fill();

                p.x += p.dx;
                p.y += p.dy;
            });

            requestAnimationFrame(animate);
        }

        animate();
    }


    /* ============================= */
    /* Email Obfuscation */
    /* ============================= */
    const emailElement = document.getElementById("email");
    if (emailElement) {
        const user = "sandipdusadh50";
        const domain = "gmail.com";
        emailElement.innerHTML =
            `<a href="mailto:${user}@${domain}">${user}@${domain}</a>`;
    }


    /* ============================= */
    /* EmailJS Contact Form */
    /* ============================= */
    if (typeof emailjs !== "undefined") {

        emailjs.init("rnTrmOTY0qW2UVjOK");

        const form = document.getElementById("contact-form");

        if (form) {
            form.addEventListener("submit", function (event) {
                event.preventDefault();

                const submitButton = form.querySelector("button[type='submit']");
                submitButton.disabled = true;
                submitButton.textContent = "Sending... ⏳";

                emailjs.sendForm(
                    "service_hma0mfl",
                    "template_pyeslng",
                    this
                ).then(function () {

                    let successMsg = document.createElement("p");
                    successMsg.textContent = "✅ Message sent successfully!";
                    successMsg.style.color = "green";
                    form.appendChild(successMsg);

                    form.reset();
                    submitButton.disabled = false;
                    submitButton.textContent = "Send Message";

                    setTimeout(() => successMsg.remove(), 5000);

                }).catch(function () {

                    let errorMsg = document.createElement("p");
                    errorMsg.textContent = "❌ Failed to send message. Please try again.";
                    errorMsg.style.color = "red";
                    form.appendChild(errorMsg);

                    submitButton.disabled = false;
                    submitButton.textContent = "Send Message";

                    setTimeout(() => errorMsg.remove(), 5000);
                });
            });
        }
    }

});