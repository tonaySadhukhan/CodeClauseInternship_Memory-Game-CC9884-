window.onload=function ar() {
   
    setTimeout(() => timer(1), 1000); // Corrected: Call timer after 1 second

    const a = ["1", "2", "3", "4", "5", "6", "7", "8"];
    let positions = Array.from({length: 16}, (_, index) => index); // Create an array [0, 1, 2, ..., 15]
    
    // Shuffle the positions array to get random unique positions
    for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]]; // Swap
    }

    // Now assign pairs of positions to the images
    let i = 0;
    while (i < 8) {
        let pos1 = positions[i * 2];    // First position for image i
        let pos2 = positions[i * 2 + 1]; // Second position for image i

        document.getElementById(pos1.toString()).innerHTML = '<img src="' + a[i] + '.png" >';
        document.getElementById(pos2.toString()).innerHTML = '<img src="' + a[i] + '.png" >';
        
        i++;
    }


let p;
let q = ['1', '2'];
let count = 1;
let point = 0;
let k = document.querySelectorAll(".flip-card-inner");

k.forEach(btn => {
    btn.addEventListener('click', event => {
        // Check if the button has already been disabled
        if (btn.classList.contains('disabled')) {
            return; // Do nothing if the card is already disabled
        }
        
        if (count == 1) {
            let image = btn.querySelector(".flip-card-back");
            p = image.innerHTML;
            q[0] = btn.id;
            count++;
        } else {
            let image = btn.querySelector(".flip-card-back").innerHTML;
            q[1] = btn.id;
            if (p === image && q[0] !== q[1]) {
                point += 10;
                document.querySelector('h2').innerHTML = 'score: ' + point + ' ';
                document.querySelector('h2').style = "font-size: 2rem;color: #e76f51; margin-left: 5%;";

                if (point == 80) {
                   
                    let left = (window.screen.width - 1000) / 2;
                    let right = (window.screen.height - 1000) / 2;
                    window.location.href='victory.html';
                   // window.open('victory.html', 'PopupWindow', 'width=1000,height=700,left=' + left + ',right=' + right);
                }
                setTimeout(disable, 700);  // Disable the matched cards
            } else {
                setTimeout(delay, 700);  // Flip the cards back if they don't match
            }
            count--;
        }
    });
});

function delay() {
    const z = document.getElementById(q[0]);
    const z1 = document.getElementById(q[1]);
    z.classList.toggle('flipped');
    z1.classList.toggle('flipped');
}

function disable() {
    const z = document.getElementById(q[0]);
    const z1 = document.getElementById(q[1]);

    // Disable flipping for the matched cards and set opacity
    [z, z1].forEach((element) => {
        element.style.opacity = '0.5';
        element.classList.add('disabled');  // Add a class to mark this element as disabled
        element.isenable = false;  // Optionally, you can set a flag to indicate it's disabled
    });
}


function timer(i) {
    let progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = i + '%';
    }
    if (i >= 100) {
        alert("Time up");
        location.reload();
        return;
    }
    if (point == 80) {
        return;
    }
    setTimeout(() => timer(i + 1), 1000);
}
}

