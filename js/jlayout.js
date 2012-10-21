$(function() {
    
    $("#add-block").click(function(){
        
        
        
        
    });
    
    
    $("#layout-builder").sortable();
    
    
    $(".layout-block").draggable({ 
        containment: "parent"
    }).resizable({
        containment: "parent",
        handles: "e, w"
    });
    
    
    $(".block-name").live('dblclick', function(e){
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
    
    $(".remove-block").live("click", function(e){
        var row = $(this).parents(".layout-row");
        $(this).parents(".layout-block").remove();
        
        if(row.children().length == 0) {
            row.remove();
        }
        e.preventDefault();
    });    
    
    
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
        
    });
    
});