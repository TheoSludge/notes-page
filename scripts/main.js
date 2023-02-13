const notes = document.querySelectorAll('.note');
const whiteboard = document.querySelector('.whiteboard');

notes.forEach(note => {
    let isDragging = false;
    let currentNote;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    note.addEventListener('mousedown', dragStart);
    note.addEventListener('mouseup', dragEnd);
    note.addEventListener('mouseout', dragEnd);
    note.addEventListener('mousemove', drag);

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        isDragging = true;
        currentNote = this;
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;

        isDragging = false;
    }

    function drag(e) {

        let minX = 0;
        let minY = 0;
        let maxX = whiteboard.offsetWidth - note.offsetWidth;
        let maxY = whiteboard.offsetHeight - note.offsetHeight;

        if (isDragging) {
            e.preventDefault();

            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            currentX = Math.min(Math.max(currentX, minX), maxX);
            currentY = Math.min(Math.max(currentY, minY), maxY);

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, note);
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)';
    }
});