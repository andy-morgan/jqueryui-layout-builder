$(function() {

    var new_row_html = '<div class="layout-row"></div>';
    var new_block_html = '<div class="layout-block">\
                        <span class="block-name">Block</span>\
                        <div class="btn-group">\
                            <a class="btn split-block" href="#" title="Split Block"><i class="icon-pause"></i></a>\
                            <a class="btn remove-block" href="#" title="Remove Block"><i class="icon-trash"></i></a>\
                        </div>\
                    </div>';

    /*
     * Initialise it all
     */
    $("#layout-builder").sortable();

    $(".layout-block").draggable({
        containment: "parent"
    }).resizable({
        containment: "parent",
        handles: "e, w"
    });


    /*
     * Add block
     *
     * This adds a new row with an extra block inside it
     */
    $("#add-block").click(function(e){
        e.preventDefault();

        var new_row = $(new_row_html);
        var new_block = $(new_block_html);

        new_row.append(new_block);

        new_row.find(".layout-block").draggable({
            containment: "parent"
        }).resizable({
            containment: "parent",
            handles: "e, w"
        });

        $("#layout-builder").append(new_row);
    });


    /*
     * Edit the block name
     */
    $('.block-name').live('dblclick', function(e){
        var input = $('<input class="edit-block-name" type="text" value="' + $(this).text()  + '" />');
        $(this).hide();
        $(this).after(input);
        input.focus();
    });

    $('.edit-block-name').live('blur', function(e){
        var span = $(this).parents('.layout-block').children('.block-name');
        if($(this).val() != '') {
            span.text($(this).val());
        }
        $(this).remove();
        span.show();
    });


    /*
     * Split a block in two
     */
    $(".split-block").live("click", function(e){
        e.preventDefault();

        var row = $(this).parents(".layout-row");
        var block = $(this).parents(".layout-block");

        var new_block = $(new_block_html);

        var block_padding = (block.outerWidth() - block.width()) / 2; // padding will also include border
        var block_margin = 8;
        var block_width = (block.outerWidth() / 2) - (2 * block_padding) - (0.5 * block_margin);
        var block_pos = block.position();

        // @todo: some sensible thing here if block becomes too small / more than say 5?

        block.css('width', block_width );
        new_block.css('width', block_width);
        new_block.css('left', block_pos.left + (block_width + block_margin + (2 * block_padding)));

        new_block.draggable({
            containment: "parent"
        }).resizable({
            containment: "parent",
            handles: "e, w"
        });

        block.after(new_block);
    });


    /*
     * Remove a block - and if only block in row the row too!
     */
    $(".remove-block").live("click", function(e){
        var row = $(this).parents(".layout-row");
        $(this).parents(".layout-block").remove();

        if(row.children().length == 0) {
            row.remove();
        }
        e.preventDefault();
    });


    /*
     * Save template
     *
     * Want to create some ajax on save click and submit that somewhere
     */
    $('#save-template').click(function(e){
        e.preventDefault();
        var data = new Array;

        $("#layout-builder").find(".layout-row").each(function(){
           var row_data = new Array;
           var row_width = $(this).innerWidth();
           var cumulative_width = 0;
           $(this).find(".layout-block").each(function(){
               var block_data = {
                   name: $(".block-name", this).text(),
                   width: ($(this).outerWidth() / row_width) * 100,
                   left: ($(this).position().left / row_width) * 100
               };
               cumulative_width += block_data.width;
               row_data.push(block_data);
           });

           // now verify nothing weird about this row data liek too wide!
           if(cumulative_width > 100) {
               // @todo: an error here
           }
           data.push(row_data);
        });


        console.log(data);
        console.log(JSON.stringify(data, null, 2));

    });

});