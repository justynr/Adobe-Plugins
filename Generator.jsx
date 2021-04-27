var box = new Window('dialog', "SHAPES!");
box.panel = box.add('panel', undefined, "Include Shapes");
box.panel.shape_square = box.panel.add('checkbox', undefined, "Square");
box.panel.shape_triangle = box.panel.add('checkbox', undefined, "Triangle");
box.panel.shape_hexagon = box.panel.add('checkbox', undefined, "Hexagon");
//box.panel.shape_diamond = box.panel.add('checkbox', undefined, "Diamond");
//box.panel.shape_trapezoid = box.panel.add('checkbox', undefined, "Trapezoid");
//box.panel.shape_longPolygon = box.panel.add('checkbox', undefined, "Long Polygon");
//box.panel.shape_star = box.panel.add('checkbox', undefined, "Star");
box.panel.shape_all = box.panel.add('checkbox', undefined, "All");

// box.panel.shape_diamond.value = true
// box.panel.shape_square.value = true
// box.panel.shape_hexagon.value = true

box.panel.alignChildren = "left";
box.panel.character = 8;


box.panel2 = box.add('panel', undefined, "Generate");
box.panel2.group1 = box.panel2.add('group', undefined );
box.panel2.orientation='column';

box.panel2.group1.countLabel = box.panel2.group1.add('statictext', undefined, "Quantity:");
box.panel2.group1.count = box.panel2.group1.add("edittext", undefined, "10");
box.panel2.group1.count.characters = 3;

box.panel2.group2 = box.panel2.add('group', undefined );
box.panel2.group2.orientation='row';
box.panel2.group2.columnLabel = box.panel2.group2.add('statictext', undefined, "Columns:");
box.panel2.group2.column = box.panel2.group2.add("edittext", undefined, "6");
box.panel2.group2.column.characters = 3;

box.panel2.group3 = box.panel2.add('group', undefined );
box.panel2.group3.orientation='row';
box.panel2.group3.widthLabel = box.panel2.group3.add('statictext', undefined, "Size (px):");
box.panel2.group3.width = box.panel2.group3.add("edittext", undefined, "75");
box.panel2.group3.width.characters = 3;

// box.panel2.group4 = box.panel2.add('group', undefined );
// box.panel2.group4.orientation='row';
// box.panel2.group4.heightLabel = box.panel2.group4.add('statictext', undefined, "How high:");
// box.panel2.group4.height = box.panel2.group4.add("edittext", undefined, "75");
// box.panel2.group4.height.characters = 3;


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
  //box.panel.shape_diamond.value = thisBool;
  //box.panel.shape_trapezoid.value = thisBool;
  box.panel.shape_triangle.value = thisBool;
  box.panel.shape_square.value = thisBool;
  box.panel.shape_hexagon.value = thisBool;
  //box.panel.shape_longPolygon.value = thisBool;
}




function letsGo() {
  //  documents.add();
  const count = parseInt(box.panel2.group1.count.text)
  const column = parseInt(box.panel2.group2.column.text)
  const width = parseInt(box.panel2.group3.width.text)
  //const height = parseInt(box.panel2.group2.height.text)


  var idoc = app.activeDocument;
  var activeAB = idoc.artboards[idoc.artboards.getActiveArtboardIndex()]; // get active AB

  docLeft = activeAB.artboardRect[0];
  docTop = activeAB.artboardRect[1]; 

  const xPosStart = docLeft + width / 2
  var yPosStart = docTop - width
  var xPos = xPosStart

  var shapeOptions = {
    filled : true,
    stroked : false,
    strokeWidth : 0,
    opacity: 75
  }

  if (box.panel.shape_square.value == true) {
    app.activeDocument.layers.add()
    //app.defaultStroked = true;
    app.filled = true;

    var groupHeight = Math.ceil((count/column)) * width - (yPosStart/1.5)
    
    for ( r = 1; r < ( count + 1 ); r++ ) {
      var squareGroup = app.activeDocument.groupItems.add();
      
      var row = (Math.ceil( r / column ) -1 ) * -1
      var yPos = row * width + yPosStart
      var rect = squareGroup.pathItems.rectangle( yPos, xPos, width, width );

      xPos = xPosStart + ( width * ( r % column ) );
      
      var fillColor = new RGBColor
      var newColour = getNextColor(r)
      fillColor.red = newColour[0];
      fillColor.green = newColour[1];
      fillColor.blue = newColour[2];
      rect.fillColor = fillColor;
      rect.opacity = shapeOptions.opacity;
      rect.stroked = shapeOptions.stroked;
    }
    yPosStart -= groupHeight
  }

  if (box.panel.shape_triangle.value == true) {
    app.activeDocument.layers.add()
    var hexHigh = ((Math.sqrt(3)) * width)
    var xOffset = width * 0.5

    var triangleSide = width * 0.5773503161570331

    var triHeight = Math.ceil((count/column)*1.5) * (hexHigh /4)

    for ( r = 0; r < (count); r++ ) {
      var triangleGroup = app.activeDocument.groupItems.add();
      
      var row = (Math.ceil(( r + 1 ) / column ) -1 ) * -1
      var yOffset = (hexHigh * (( r ) % 2 )) / 2
      var yPos = (( row * hexHigh / 2 ) + ( yPosStart ) ) 
      xPos = ((( r % column )) * xOffset ) + (( ( xOffset * -1 ) * (( row * -1 ) % 2 ) * ( column % 2 ))) + ( xPosStart * 2 )

      var triangle = triangleGroup.pathItems.polygon( xPos, yPos, triangleSide, 3 );
      var fillColor = new RGBColor

      var newColour = getNextColor(r)
      fillColor.red = newColour[0];
      fillColor.green = newColour[1];
      fillColor.blue = newColour[2];
      triangle.fillColor = fillColor
      triangle.opacity = shapeOptions.opacity;
      triangle.stroked = shapeOptions.stroked;
      triangle.rotate(180 * (( (r+1) % 2 ) + ( row % 2 )))
    }
    yPosStart -= triHeight
  }

  if (box.panel.shape_hexagon.value == true) {
    app.activeDocument.layers.add()

    var localWidth = width * 2
    var hexHigh = ((Math.sqrt( 3 ) / 2) * localWidth)
    var xOffset = localWidth * 0.75

    var hexHeight = Math.ceil((count/column)) * hexHigh - (yPosStart/1.66666667)
        
    for ( r = 0; r < (count); r++ ) {
      var hexGroup = app.activeDocument.groupItems.add();
      
      var row = (Math.ceil( ( r + 1 ) / column ) -1 ) * -1
      var yOffset = (hexHigh * ((r)%2))/2
      var yPos = ( ( row * hexHigh ) + ( yPosStart * 1.333333 ) ) + yOffset
      xPos = ((( r % (column) ) ) * xOffset ) + (( xOffset * (( row * -1 ) % 2 ) * ( column % 2 ))) + ( xPosStart * 2.25 )

      var hexagon = hexGroup.pathItems.polygon( xPos, yPos, localWidth / 2, 6 );
      
      var fillColor = new RGBColor
      var newColour = getNextColor(r)
      fillColor.red = newColour[0];
      fillColor.green = newColour[1];
      fillColor.blue = newColour[2];
      hexagon.fillColor = fillColor
      hexagon.opacity = shapeOptions.opacity;
      hexagon.stroked = shapeOptions.stroked;
    }
  }

  /*
  if (box.panel.shape_diamond.value == true){
    if ( app.documents.length > 0 ) {
      var triangleGroup = app.activeDocument.groupItems.add();
      // Create a triangle and add text, the new art is created inside the group
      var trianglePath = triangleGroup.pathItems.add();
      trianglePath.setEntirePath( Array( Array(75, 100), Array(300, 100),
      Array(75, Math.tan(1.0471975) * 100 + 100) ) );
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
*/
}

var colorList = [
  [255,0,0], 
  [39,213,7], 
  [0,255,255], 
  [255,0,255], 
  [0,0,255], 
  [166,152,246], 
  [143,21,0], 
  [7,91,226], 
  [239,99,2],
  [117,243,54],
  [117,	54,	243],
  [153,153,153],
  [75,75,75]
]

//Cycle through colour list
function getNextColor(i){
  var col = i % colorList.length
  return (colorList[col])
}

//Get random colour
function getRandomColor(){
  const rnd = Math.round(getRandomNum(0, colorList.length - 1),0)
  return(colorList[rnd])
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



