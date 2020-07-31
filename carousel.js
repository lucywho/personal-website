(function() {
    const project = document.querySelectorAll("#carousel .project");
    const dots = document.querySelectorAll("#dots .dot");
    const total = project.length;
    let last = total - 1;
    let i = 0;
    let timer;
    let isTransitioning = false;

    timer = setTimeout(moveProject, 5000);

    function moveProject(index) {
        isTransitioning = true;
        if (typeof index == "number") {
            if (i === index) {
                return;
            } else {
                project[i].classList.remove("onscreen");
                dots[i].classList.remove("fill-in");
                project[i].classList.add("offscreen-left");

                i = index;

                dots[i].classList.add("fill-in");
                project[i].classList.add("onscreen");
            }
        } else if (i < last) {
            project[i].classList.remove("onscreen");
            dots[i].classList.remove("fill-in");
            project[i].classList.add("offscreen-left");

            i++;

            dots[i].classList.add("fill-in");
            project[i].classList.add("onscreen");
        } else if (i === last) {
            project[i].classList.remove("onscreen");
            dots[i].classList.remove("fill-in");
            project[i].classList.add("offscreen-left");

            i = 0;

            dots[i].classList.add("fill-in");
            project[i].classList.add("onscreen");
        }
        timer = setTimeout(moveProject, 7000);
    }

    for (let x = 0; x < dots.length; x++) {
        dots[x].addEventListener("click", clickHandler(x));
    }

    function clickHandler(dotIndex) {
        return function() {
            if (isTransitioning) {
                return;
            } else {
                for (let d = 0; d < dots.length; d++) {
                    dots[d].classList.remove("fill-in");
                }
                dots[dotIndex].classList.add("fill-in");
                clearTimeout(timer);
                moveProject(dotIndex);
            }
        };
    }

    document.addEventListener("transitionend", function(event) {
        if (event.target.classList.contains("offscreen-left")) {
            event.target.classList.remove("offscreen-left");
            isTransitioning = false;
        }
    });
})();
