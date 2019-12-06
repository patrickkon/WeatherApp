// Unused module. Can be deleted

export function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)
    console.log("ineted")
    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        //node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}

function infinite(eventObj){
    while(!eventObj.end){
        //animateCSS(element, animationName);     
    } 
    console.log("preace")
    eventObj.end = false;
    return Promise.resolve();
}

export async function animateTitle(element, animationName, eventObj){
   var result = await infinite(eventObj);
};



