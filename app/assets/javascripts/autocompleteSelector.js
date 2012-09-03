var AutocompleteSelector = function() {

  var Constructor  = function(options) {
  	// this.domParent = options.parentSelector;
  	this.options   = options;
    this.domParent = $(options.parentSelector);
  	this.field     = options.field;
  	this.universe  = options.dataUniverse;
  	$(this.domParent).append(this.hiddenField())
  	                 .append(this.textInput())
  	                 .append(this.addButton())
                     .append(this.valueList());

    $("#" + this.determineId("add_button")).click(
        $.proxy(this.addEventHandler, this));

    $(".delete-button").click(
         $.proxy(this.deleteEventHandler, this));
  };

  Constructor.prototype = {

    determineId: function(suffix) {
      var id = this.field.replace("][", "_").replace("[", "").replace("]", "");
      if(suffix) {
      	id = id + "_" + suffix;
      }
      return id;
    },

    initialValue: function() {
      return this.options.initialValue;
    },
  
    hiddenField: function() {
      return $("<input type='hidden' />")
              .attr("id", this.determineId())
              .attr("name", this.field)
              .val(this.initialValue());
    },
  
    textInput: function() {
      return $("<input type='text' />")
              .attr("id", this.determineId("autocomplete"))
              .attr("name", this.field + "[autocomplete]");
    },
  
    addButton: function() {
      return $("<a href='#' >")
              .attr("id", this.determineId("add_button"))
              .html("Add")
              .addClass("selector_add_button");
    },

    listElement: function(value) {
      return $("<li>").attr("id", this.determineId("element_" + value))
                      .text(this.universe[value]);
    },

    linkElement: function(value) {
      return $("<a href='#'>").addClass("delete-button")
                              .attr("id", this.determineId("delete_" + value))
                              .text(" Delete");
    },

    valueList: function() {
      var $ul  = $("<ul>").attr("id", this.determineId("list"));
      var that = this;
      $.each(this.initialValue().split(","), function(index, value) {
        var $li = that.listElement(value);
        var $a  = that.linkElement(value);
        $li.append($a);
        $ul.append($li);
      });
      return $ul;
    },

    idLookup: function(itemName) {
      for(id in this.universe) {
        if(this.universe[id] === itemName) {
          return id;
        }
      }
      return null;
    },

    addEventHandler: function(event) {
      var newItemName = $("#" + this.determineId("autocomplete")).val();
      var newItemId   = this.idLookup(newItemName);
      if(!newItemId) {
        return;
      }
      var hiddenField = $("#" + this.determineId());
      hiddenField.val(hiddenField.val() + "," + newItemId);
      var list = $("#" + this.determineId("list"));
      var $li = this.listElement(newItemId);
      var $a  = this.linkElement(newItemId);
      $li.append($a);
      list.append($li);
      var $autocomplete = $("#" + this.determineId("autocomplete"));
      $autocomplete.val("");
      $autocomplete.focus();
      event.preventDefault();
    },

    deleteEventHandler: function(event) {
      var idToDelete    = $(event.target).attr('id').split("_").pop();
      var hiddenField   = $("#" + this.determineId());
      var existingIds   = hiddenField.val().split(",");
      var indexToRemove = existingIds.indexOf(idToDelete);
      if (indexToRemove != -1) {
        existingIds.splice(indexToRemove, 1);
        hiddenField.val(existingIds.join(","));
      }
      $(event.target).closest("li").remove();
      event.preventDefault();
    },
  };

  return Constructor;
}();

var initializeAutocompleteSelector = function(options) {
  new AutocompleteSelector(options);
}