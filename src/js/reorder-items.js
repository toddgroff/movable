//function for allowing items in list to be reordered drag and drop style
app.reorderItems = function () {
//bind events to the mousedown of certain elements
    $('.reorderable').mousedown(function(e) {
        var item = $(this);

//add a class to the item that we've grabbed
        item.addClass('reordering');

//Disallow text selection while dragging to prevent weird behavior
        $(document).on('selectstart dragstart', preventTextSelection);

//continue reordering when mouse is moving
        $('body').on('mousemove', reorder);

//end reordering when mouse up
        $('body').on('mouseup', stopReordering);

    //prevents text selection
    function preventTextSelection(e) {
        e.preventDefault();
    }

    //assess the position of mouse relative to the top/bottom of //the items above/below
    //return whether an item should move positions
    function shouldMoveUp (y) {
        var offset = item.prev().offset();

        return offset && offset.top > y;
    }

    function shouldMoveDown (y) {
        var next = item.next();
        var offset = next.offset();

        return offset && offset.top + next.height() < y;
    }

    //use the shouldMoveUp and shouldMoveDown functions to change order of items
    function reorder(e) {
        if (shouldMoveUp(e.pageY)) {
            item.insertBefore(item.prev());
        } else if (shouldMoveDown(e.pageY)) {
            item.insertAfter(item.next());
        }

        return false;
    }

    //end the dragging of elements and get clear event binders
    function stopReordering() {
        item.removeClass('reordering');

        $('body').off('mouseup', stopReordering);
        $('body').off('mousemove', reorder);
        $(document).off('selectstart dragstart', preventTextSelection);
        }
    });
};
