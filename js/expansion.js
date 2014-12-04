

function main() {
  $(document).keypress(function(e) {
    e.preventDefault();
    if(e.keyCode == 38 || e.keyCode == 87){
      document.alert('It works!');
    }
  })
}


$(document).ready(function(){
  $(document).keydown(function(e) {
    e.preventDefault();
    if(e.keyCode == 38 || e.keyCode == 87){
      document.alert('It works!');
    }
  }
}));
