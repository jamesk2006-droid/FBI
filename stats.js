const statCounters = document.querySelectorAll(".result-card h2, #our-reach .stat-value");
const reduceStatMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function animateStatCounter(element) {
    const finalText = element.textContent.trim();
    const valueMatch = finalText.match(/^([^\d]*)([\d,]+)(.*)$/);

    if (!valueMatch) {
        return;
    }

    const [, prefix, formattedValue, suffix] = valueMatch;
    const targetValue = Number(formattedValue.replace(/,/g, ""));
    const duration = 1600;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(targetValue * easedProgress);

        element.textContent = `${prefix}${currentValue.toLocaleString("en-US")}${suffix}`;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = finalText;
        }
    }

    requestAnimationFrame(updateCounter);
}

if (!reduceStatMotion && statCounters.length) {
    if ("IntersectionObserver" in window) {
        const statObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statObserver.unobserve(entry.target);
                    animateStatCounter(entry.target);
                }
            });
        }, { threshold: 0.35 });

        statCounters.forEach(counter => statObserver.observe(counter));
    } else {
        statCounters.forEach(animateStatCounter);
    }
}
