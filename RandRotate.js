// Brought to you by dotpixeldesign.com
// Enjoy!

aDoc = app.activeDocument;
aSel = aDoc.selection;
nSel = aSel.length;

opMin = Number(prompt("min (0-180)", 0));
opMax = Number(prompt("max (180-360)", 360));

if(opMin > opMax)
{
	temp = opMin;
	opMin = opMax;
	opMax = temp;
}
if(opMin<0)
	opMIn = 0;
if(opMax>1000)
	opMax = 1000;

for(i=0; i<nSel; i++)
{
	resRotate = Math.floor(Math.random() * (opMax - opMin + 1)) + opMin;
	aSel[i].rotate(resRotate, resRotate);
}