//drag items on mousedown within the bounds of a parent div
app.moveItems = function () {
  // When our draggable item is clicked:
  $('.draggable').mousedown(function (e) {
    // get draggable item
    var item = $(this);

    // Get item's position
    var position = item.position();

    // make up for the difference between the position of the
    //cursor on mousedown and the top left corner of the item
    var shiftX = e.pageX - position.left;
    var shiftY = e.pageY - position.top;

    // drag the item on mousemove
    $('body').on('mousemove', moveItem);

    // drop the item on mouseup
    $('body').on('mouseup', stopTracking);

    // defines moving item
    function moveItem(e) {
        // Set the item's top and left coordinate
        // based on the mouse position
        item.css({
            top: e.pageY - shiftY,
            left: e.pageX - shiftX
        });
    }

    // unbind our mouse-events
    function stopTracking() {
        $('body').off('mousemove', moveItem);
        $('body').off('mouseup', stopTracking);
    }
  });
};
