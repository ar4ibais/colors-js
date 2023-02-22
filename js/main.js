const cols = document.querySelectorAll('.col');


function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : [];

    cols.forEach((col, index) => {
        const text = col.querySelector('h1'),
              isLocked = col.children[1];

        if (isLocked.classList.contains('active')) {
            colors.push(text.textContent);
            return;
        }

        const color = isInitial ? colors[index] : chroma.random();

        if (!isInitial) {
            colors.push(color);
        }

        col.style.backgroundColor = color;
        text.textContent = color;
        setTextColor(text, color);
    });
    updateColorHash(colors);
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function copyToClickBoard(text) {
    return navigator.clipboard.writeText(text);
}

function updateColorHash(colors = []) {
    document.location.hash = colors.map(col => col.toString().substring(1)).join('-');
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash
            .substring(1)
            .split('-')
            .map(col => '#' + col);
    }
    return [];
}

setRandomColors(true);
 

window.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.code.toLowerCase() == 'space') {
        setRandomColors();
    }
});

document.addEventListener('click', e => {
    if (e.target.classList.contains('btn')) {
        e.target.classList.toggle('active');
    } else if (e.target.getAttribute('data-type') == 'copy') {
        copyToClickBoard(e.target.textContent);
    }
});