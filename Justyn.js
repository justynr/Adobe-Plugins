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
box.panel2.group1.thisMany = box.panel2.group1.add("edittext", undefined, "100");
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
  if (box.panel.shape_star.value == true){ 
    letsGo();
  }
};






function letsGo() {
//  documents.add();

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




box.show()



