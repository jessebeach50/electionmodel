document.addEventListener('mouseover', function (event) {
    let hoveredElement = event.target;
    if (hoveredElement.tagName.toLowerCase() === 'path') {
        let hoveredElement = event.target;
        // Find center of BBox of path, used in CSS for hover
        let bbox = hoveredElement.getBBox();
        let centerX = bbox.x + bbox.width / 2;
        let centerY = bbox.y + bbox.height / 2;
        hoveredElement.style.setProperty('--center-x', `${centerX}px`);
        hoveredElement.style.setProperty('--center-y', `${centerY}px`);
    }
});

document.addEventListener('mouseover', function (event) {
    let hoveredElement = event.target;
    if (hoveredElement.tagName.toLowerCase() === 'path') {
        // Layering fix
        d3.selectAll("path").on("mouseleave", function () {
            d3.select(this).raise()
        })
    }
});