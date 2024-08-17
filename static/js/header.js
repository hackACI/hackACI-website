$(".dropdown-menu").on("click", function(){
  const svg = $(this).find("svg");
  svg.toggleClass("rotate");
  const dropdown = $(this).find(".dropdown");
  if (svg.hasClass("rotate")){
    dropdown.css("display", "");
    //dynamically adds spacing depending on number of elements
    let svgHeight = svg.outerHeight();
    dropdown.css("transform", `translatey(${svgHeight}px)`);
    $(this).addClass("active");
    hasFaded = true;
  }else{
    dropdown.animate(
      {
        opacity: 0
      },
      {
      duration: 300,
      complete: function(){
          dropdown.css("opacity", "");
          dropdown.css("display", "none");
          hasFaded = false;
          $(this).removeClass("active");
        }
      }
    )
  }
});
