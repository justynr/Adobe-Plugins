var box = new Window('dialog', "SHAPES!");
box.panel = box.add('panel', undefined, "Include Shapes");
//box.panel.shape_all = box.panel.add('checkbox', undefined, "All");
box.panel.shape_diamond = box.panel.add('checkbox', undefined, "Diamond");
box.panel.shape_trapezoid = box.panel.add('checkbox', undefined, "Trapezoid");
box.panel.shape_triangle = box.panel.add('checkbox', undefined, "Triangle");
box.panel.shape_square = box.panel.add('checkbox', undefined, "Square");
box.panel.shape_longPolygon = box.panel.add('checkbox', undefined, "Long Polygon");
box.panel.shape_hexagon = box.panel.add('checkbox', undefined, "Hexagon");
box.panel.shape_triangle.value = true
box.panel.shape_star = box.panel.add('checkbox', undefined, "Star");

box.panel.alignChildren = "left";
box.panel.character = 8;


box.panel2 = box.add('panel', undefined, "Generate");
box.panel2.group1 = box.panel2.add('group', undefined );
box.panel2.group1.orientation='row';
box.panel2.group1.countLabel = box.panel2.group1.add('statictext', undefined, "How many to create:");
box.panel2.group1.count = box.panel2.group1.add("edittext", undefined, "10");
box.panel2.group1.count.characters = 8;

box.panel2.group2 = box.panel2.add('group', undefined );
box.panel2.group2.orientation='row';
box.panel2.group2.clusterLabel = box.panel2.group2.add('statictext', undefined, "How many clusters:");
box.panel2.group2.cluster = box.panel2.group2.add("edittext", undefined, "3");
box.panel2.group2.cluster.characters = 8;

box.panel2.group2.columnLabel = box.panel2.group2.add('statictext', undefined, "How many wide:");
box.panel2.group2.column = box.panel2.group2.add("edittext", undefined, "6");
box.panel2.group2.column.characters = 3;

box.panel2.group2.widthLabel = box.panel2.group2.add('statictext', undefined, "How wide:");
box.panel2.group2.width = box.panel2.group2.add("edittext", undefined, "75");
box.panel2.group2.width.characters = 3;

box.panel2.group2.heightLabel = box.panel2.group2.add('statictext', undefined, "How high:");
box.panel2.group2.height = box.panel2.group2.add("edittext", undefined, "75");
box.panel2.group2.height.characters = 3;


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

// box.panel.shape_all.onClick = function() {
//   var thisBool = false;  
//   if(box.panel.shape_all.value == true) {
//     thisBool = true;
//   }
//   box.panel.shape_diamond.value = thisBool;
//   box.panel.shape_trapezoid.value = thisBool;
//   box.panel.shape_triangle.value = thisBool;
//   box.panel.shape_square.value = thisBool;
//   box.panel.shape_longPolygon.value = thisBool;
//}




function letsGo() {
//  documents.add();
  const count = parseInt(box.panel2.group1.count.text)
  const width = parseInt(box.panel2.group2.width.text)
  const height = parseInt(box.panel2.group2.height.text)
  const column = parseInt(box.panel2.group2.column.text)

  const xPosStart = 40
  const yPosStart = 40
  var xPos = xPosStart

  var colorList = ['red', 'lime', 'cyan', 'magenta', 'blue']

  var shapeOptions = {
    filled : true,
    stroked : false,
    strokeWidth : 0,
  }

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

  if (box.panel.shape_diamond.value == true){
    if ( app.documents.length > 0 ) {
      var triangleGroup = app.activeDocument.groupItems.add();
      // Create a triangle and add text, the new art is created inside the group
      var trianglePath = triangleGroup.pathItems.add();
      trianglePath.setEntirePath( Array( Array(100, 100), Array(300, 100),
      Array(200, Math.tan(1.0471975) * 100 + 100) ) );
      trianglePath.closed = true;
      trianglePath.stroked = shapeOptions.stroked;
      trianglePath.filled = shapeOptions.filled;
      trianglePath.strokeWidth = shapeOptions.strokeWidth;
      var fillColor = new RGBColor;
      fillColor.red = 255;
      fillColor.green = 0;
      fillColor.blue = 0;
    }
      trianglePath.fillColor = fillColor
  }

  if (box.panel.shape_square.value == true) {
    //app.defaultStroked = true;
    app.filled = true;


        
    for ( r = 1; r < (count+1); r++ ) {
      var row = (Math.ceil(r/column)-1) * -1
      var yPos = row * height + yPosStart
      var squareGroup = app.activeDocument.groupItems.add();
      var rect = squareGroup.pathItems.rectangle( yPos, xPos, width, height );
      var fillColor = new RGBColor
      fillColor.red = getRandomNum(128,255);
      fillColor.green = getRandomNum(128,255);
      fillColor.blue = getRandomNum(128,255);
      rect.fillColor = fillColor;
      rect.stroked = shapeOptions.stroked;
      xPos = xPosStart + (width * (r%column));
    }
  }


  if (box.panel.shape_hexagon.value == true) {

    width = width*2

    var hexHigh = ((Math.sqrt(3)/2) * width)
    var xOffset = width * 0.75
        
    for ( r = 0; r < (count); r++ ) {
      var row = (Math.ceil((r+1)/column)-1) * -1
      var yOffset = (hexHigh * ((r)%2))/2
      var yPos = ((row * hexHigh) + yPosStart) + yOffset
      var hexGroup = app.activeDocument.groupItems.add();

      xPos = ((( r % (column) ) ) * xOffset) + (( xOffset * (( row * -1 ) % 2 ) * ( column % 2 ))) + (xPosStart * 2)

      var hexagon = hexGroup.pathItems.polygon( xPos, yPos, width/2, 6 );
      var fillColor = new RGBColor

      fillColor.red = getRandomNum(64,255);
      fillColor.green = getRandomNum(64,255);
      fillColor.blue = getRandomNum(64,255);
      hexagon.fillColor = fillColor
      hexagon.opacity = 50;
      hexagon.stroked = shapeOptions.stroked;
    }
  }

  if (box.panel.shape_triangle.value == true) {

    var hexHigh = ((Math.sqrt(3)) * width)
    var xOffset = width * 0.5

    var triangleSide = width * 0.5773503161570331
        
    for ( r = 0; r < (count); r++ ) {
      var row = (Math.ceil((r+1)/column)-1) * -1
      var yOffset = (hexHigh * ((r)%2))/2
      var yPos = ((row * hexHigh/2) + yPosStart) 
      var triangleGroup = app.activeDocument.groupItems.add();

      xPos = ((( r % column ) ) * xOffset ) + ( xPosStart * 2 )

      var triangle = triangleGroup.pathItems.polygon( xPos, yPos, triangleSide, 3 );
      var fillColor = new RGBColor

      fillColor.red = getRandomNum(64,255);
      fillColor.green = getRandomNum(64,255);
      fillColor.blue = getRandomNum(64,255);
      triangle.fillColor = fillColor
      triangle.opacity = 50;
      triangle.stroked = shapeOptions.stroked;
      triangle.rotate(180 * ((r % 2) + (row % 2)))
    }
  }
}

// generating random number in range [x, y)
function getRandomNum(min, max) {
  return Math.random() * (max - min) + min;
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




box.show()



