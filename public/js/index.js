$(function() {
    AddNewRow();
    $("<button />").html("Test").appendTo($("#entry-form")).click(TestData);
    $("<button />").html("Save").appendTo($("#entry-form")).click(SaveData);
    var $container = $("#test-container");
    var $ampersand = $("#ampersand");
    var data = [
      {
        "left": {
          "text": "Markis",
          "animationIn": "flyInLeft",
          "animationOut": "flyOutUp"
        },
        "right": {
          "text": "Taylor",
          "animationIn": "flyInRight",
          "animationOut": "flyOutDown"
        }
      }
    ]
    new Cratify(data, $container, $ampersand);
});

function AddNewRowByButton(event) {
    $(event.target).parent()[0].removeChild(event.target);
    AddNewRow();
}

function AddNewRow() {
    var form = $("<div />").appendTo($("#entry"));   
    $("<input />").attr({type:"text",placeholder:"left text"}).addClass("left").appendTo(form);
    CreateInDropDown().addClass("left").appendTo(form);
    CreateOutDropDown().addClass("left").appendTo(form);
    
    $("<input />").attr({type:"text",placeholder:"right text"}).addClass("right").appendTo(form);
    CreateInDropDown().addClass("right").appendTo(form);
    CreateOutDropDown().addClass("right").appendTo(form);
    
    $("<button />").html("New Frame").click(AddNewRowByButton).appendTo(form);
}

function CreateInDropDown() {
    var $dropDown = $("<select />").addClass("animationIn");
    for (animation in Animations.prototype["in"])
    {
        $dropDown.append(new Option(animation, animation, false, false));
    }
    return $dropDown;
}
function CreateOutDropDown() {
    var $dropDown = $("<select />").addClass("animationOut");
    for (animation in Animations.prototype["out"])
    {
        $dropDown.append(new Option(animation, animation, false, false));
    }
    return $dropDown;
}

function GetData() {
    var data = [];
    $("#entry > div").each(function (idx, elem) { 
        var $elem = $(elem); 
        var leftText = $elem.find("input.left").val();
        var leftAnimationIn = $elem.find("select.animationIn.left").val();
        var leftAnimationOut = $elem.find("select.animationOut.left").val();
        
        var rightText = $elem.find("input.right").val();
        var rightAnimationIn = $elem.find("select.animationIn.right").val();
        var rightAnimationOut = $elem.find("select.animationOut.right").val();
        
        data.push({
            "left": {
              "text": leftText,
              "animationIn": leftAnimationIn,
              "animationOut": leftAnimationOut
            },
            "right": {
              "text": rightText,
              "animationIn": rightAnimationIn,
              "animationOut": rightAnimationOut
            }  
        });
    });
    return data;
}
function TestData() {
    var data = GetData();
    var $container = $("#test-container");
    var $ampersand = $("#ampersand");
    new Cratify(data, $container, $ampersand);
    return false;
}
function SaveData() {
    var data = GetData();
    $.ajax({
        type: 'POST'
        , url:'/animation'
        , data: {animations:data}
        , dataType:'json'
        , success: function (data) { 
            if (data.success)  
            window.location='/view#'+data.id;  
        }
    });
    return false;
}