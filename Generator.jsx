var box = new Window('dialog', "SHAPES!");
box.panel = box.add('panel', undefined, "Include Shapes");
box.panel.shape_all = box.panel.add('checkbox', undefined, "All");
box.panel.shape_diamond = box.panel.add('checkbox', undefined, "Diamond");
box.panel.shape_trapezoid = box.panel.add('checkbox', undefined, "Trapezoid");
box.panel.shape_triangle = box.panel.add('checkbox', undefined, "Triangle");
box.panel.shape_square = box.panel.add('checkbox', undefined, "Square");
box.panel.shape_longPolygon = box.panel.add('checkbox', undefined, "Long Polygon");
box.panel.shape_star = box.panel.add('checkbox', undefined, "Star");

box.panel.alignChildren = "left";
box.panel.character = 8;


box.panel2 = box.add('panel', undefined, "Generate");
box.panel2.group1 = box.panel2.add('group', undefined );
box.panel2.group1.orientation='row';
box.panel2.group1.text1 = box.panel2.group1.add('statictext', undefined, "How many to create:");
box.panel2.group1.thisMany = box.panel2.group1.add("edittext", undefined, "10");
box.panel2.group1.thisMany.characters = 8;

box.panel2.group2 = box.panel2.add('group', undefined );
box.panel2.group2.orientation='row';
box.panel2.group2.text1 = box.panel2.group2.add('statictext', undefined, "How many clusters:");
box.panel2.group2.thisMany = box.panel2.group2.add("edittext", undefined, "3");
box.panel2.group2.thisMany.characters = 8;

box.panel2.alignChildren = "right";

box.panel3 = box.add('panel', undefined, "");
box.panel3.group = box.panel3.add('group', undefined, );
box.panel3.group.orientation='row';
box.panel3.group.goBtn = box.panel3.group.add('button',undefined, "DO IT!", {name:'do it'});
box.panel3.group.closeBtn = box.panel3.group.add('button',undefined, "Cancel", {name:'close'});



box.panel3.group.closeBtn.onClick = function(){
  box.close();
};

box.panel3.group.goBtn.onClick = function(){
  box.close();
  letsGo();
};

box.panel.shape_all.onClick = function() {
  var thisBool = false;  
  if(box.panel.shape_all.value == true) {
    thisBool = true;
  }
  box.panel.shape_diamond.value = thisBool;
  box.panel.shape_trapezoid.value = thisBool;
  box.panel.shape_triangle.value = thisBool;
  box.panel.shape_square.value = thisBool;
  box.panel.shape_longPolygon.value = thisBool;
}




function letsGo() {
//  documents.add();
  const count = parseInt(box.panel2.group1.thisMany.text)
  if (box.panel.shape_star.value == true){ 
    var doc_ref = documents[0];

    var group_ref = doc_ref.groupItems.add();
    makeUnstrokedRect( group_ref, 350, 200, 100, 100, 100, 0, 0, 0 )
    makeUnstrokedRect( group_ref, 250, 300, 100, 100, 0, 100, 0, 0 )
    makeUnstrokedRect( group_ref, 350, 300, 100, 100, 0, 0, 100, 0 )
    makeUnstrokedRect( group_ref, 250, 200, 100, 100, 50, 50, 0, 0 )

    var star_ref = group_ref.pathItems.star( 300, 250, 25, 4, 4, false );

    var blkColor = new CMYKColor();
    blkColor.black = 100;

    star_ref.fillColor = blkColor;
    star_ref.stroked = false;
    star_ref.opacity = 40;

    var matrix_ref = getRotationMatrix( 45.0 );

    star_ref.transform( matrix_ref, true, false, false, false, 1.0, Transformation.CENTER );

    star_ref = group_ref.pathItems.star( 300, 250, 100, 25, 4, false );
    star_ref.filled = false;
    star_ref.stroked = false;

    group_ref.clipped = true;

    function makeUnstrokedRect(gr,t,l,h,w,c,m,y,k)
    {
      var colorRef = new CMYKColor();
      colorRef .cyan = c;
      colorRef .magenta = m;
      colorRef .yellow = y;
      colorRef .black = k;
      
      var path_ref = gr.pathItems.rectangle(t, l, h, w);
      path_ref.fillColor = colorRef ;
      path_ref.stroked = false;
    }
  }

  if (box.panel.shape_triangle.value == true){
    if ( app.documents.length > 0 ) {
      var triangleGroup = app.activeDocument.groupItems.add();
      // Create a triangle and add text, the new art is created inside the group
      var trianglePath = triangleGroup.pathItems.add();
      trianglePath.setEntirePath( Array( Array(100, 100), Array(300, 100),
      Array(200, Math.tan(1.0471975) * 100 + 100) ) );
      trianglePath.closed = true;
      trianglePath.stroked = true;
      trianglePath.filled = true;
      trianglePath.strokeWidth = 3;
      var fillColor = new RGBColor;
      fillColor.red = 255;
      fillColor.green = 0;
      fillColor.blue = 0;
    }
      trianglePath.fillColor = fillColor
  }

  if (box.panel.shape_square.value == true) {
    // Creates 5 shapes in layer 1 of document 1
    // and applies a random graphic style to each

    
    

    //var artLayer = doc.layers[0];
    app.defaultStroked = true;
    app.defaultFilled = true;
    
    // const rowNum = Math.ceil(count/7)

    //   var xPos = xPosStart
    //     for ( c = 1; c < (count + 1); c++ ) {
    //       var squareGroup = app.activeDocument.groupItems.add();
    //       var rect = squareGroup.pathItems.rectangle( yPos, xPos, squareSize, squareSize );
    //       xPos += 75
    //       yPos = Math.ceil(c/7) * squareSize
    //     }

        const rowMax = 7

        var xPosStart = 40
        var yPosStart = 40
        const squareSize = 75
        var xPos = xPosStart
       
        
       for ( r = 1; r < (count+1); r++ ) {
         var row = (Math.ceil(r/rowMax)-1) * -1
         var yPos = row * squareSize + yPosStart
         var squareGroup = app.activeDocument.groupItems.add();
         var rect = squareGroup.pathItems.rectangle( yPos, xPos, squareSize, squareSize );
         xPos = xPosStart + (squareSize * (r%rowMax))
       }






    //var rndRect = artLayer.pathItems.roundedRectangle( 637.5, 87.5, 425.0, 75.0, 20.0, 10.0 );
    // Create ellipse, 'reversed' is false, 'inscribed' is true
    //var ellipse = artLayer.pathItems.ellipse(  512.5, 87.5, 425.0, 75.0, false, true );
    // Create octagon, and 8-sided polygon
    //var hexagon = artLayer.pathItems.polygon( 300.0, 325.0, 75.0, 6 );
    // Create a 4 pointed star
    //var star = artLayer.pathItems.star( 300.0, 125.0, 100.0, 20.0, 5 );
    //for ( i = 0; i < artLayer.pathItems.length; i++ ) {
    //styleIndex = Math.round( Math.random() * ( doc.graphicStyles.length - 1 ) );
    //doc.graphicStyles[styleIndex].applyTo( artLayer.pathItems[i] );
    }
  }





box.show()



