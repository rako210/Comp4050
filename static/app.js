const navSlide =() =>{
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    /*toggle nav*/
    burger.addEventListener('click',()=>{
        nav.classList.toggle('nav-active');

    });

    /*animate links*/
    navLinks.forEach((link, index) => {
        console.log(index);
        link.style.animate = 'navLinkFade 1s each forwards $(index/ 7)s';
    });
}

navSlide();
