/*
* All the javascript code goes here
*/
var qtt, count=1, I1, I2, I3, I4;
var input = [2];
var cName;
var mRes,pRes;
var cPercent=0,tWeight=0,cWeight;
var mFin,pFin,aFin;

function qttInputs(){
    qtt = parseInt(document.getElementById("qtt").value);
        
    for (var i = 0; i < qtt; i++) {
        I1 = "<div class=\"input-field col m3 s12\"><input id=\"gradeI"+count+"\" type=\"text\"><label for=\"gradeI"+count+"\">Grade item "+count+" Name</label></div>";
        I2 = "<div class=\"input-field col m3 s12\"><input id=\"weightage"+count+"\" type=\"number\"><label for=\"weightage"+count+"\">weightage</label></div>";
        I3 = "<div class=\"input-field col m3 s12\"><input id=\"Grade"+count+"\" type=\"number\"><label for=\"Grade"+count+"\">Grade</label></div>";
        I4 = "<div class=\"input-field col m3 s12\"><input id=\"maxGrade"+count+"\" type=\"number\"><label for=\"maxGrade"+count+"\">Max Grade</label></div>"

        input[i] = I1 + I2 + I3 + I4;    
        document.getElementById("form").innerHTML += input[i];    
        count++;
    };
}
function predict()
{
	/* take in number of items graded + choice of scenarios. Find weighted average for each item, add up and output to results*/
	lengths = input.length;
	var wScore;
	var neg = document.getElementById("negative");
	var pos = document.getElementById("positive");
	var posSel = pos.options[pos.selectedIndex].value;
	var negSel = neg.options[neg.selectedIndex].value;
	count=1;
	var itemsValue, weightageValue, gradeValue, maxGradeValue;

	//Checks if the grade item and values are null
	for (var i = 0; i < lengths; i++) {
		//trying the grade item name
    	/*if (document.getElementById("gradeI"+count).value == "") 
    	{
    		alert("Grade item "+count+" is empty");
    	}else{*/
    		itemsValue = document.getElementById("gradeI"+count).value;
    		weightageValue = document.getElementById("weightage"+count).value;
    		gradeValue = document.getElementById("Grade"+count).value;
    		maxGradeValue = document.getElementById("maxGrade"+count).value;
    	//}
			if (itemsValue.length == 0 || weightageValue == "" || gradeValue == "" || maxGradeValue == ""){
				var itemError = 1;
			}
			//adding one more to the count
			count++;
	}
	
	if(negSel == "" || posSel == "" )
	{
		alert("Please select an Upside/Downside and try again");
	}else if(itemError == 1){
		alert("There is a blank input, please correct and try again");
	}
	else
	{

	//determine total weightage for assignments
	for(var i=1;i<=lengths;i++)
	{
		cWeight=document.getElementById("weightage"+i).value;
		tWeight=tWeight+parseInt(cWeight);
		var aScore = document.getElementById("Grade"+i).value;
		var mScore = document.getElementById("maxGrade"+i).value;
		
		wScore = (aScore/mScore) * (cWeight/tWeight);
		
		cPercent=cPercent+wScore;
	};
	
	//output predicted grade based off of scenarios selected, if +% would be greater than perfect append to 100.
	aFin = cPercent*100;


	mRes=document.getElementById("negative").value;
	mRes=parseInt(mRes.substring(1));
	
	pRes = document.getElementById("positive").value;
	pRes = parseInt(pRes.substring(1));
	mFin = cPercent * (100-mRes);
	pFin = cPercent * (100+pRes)
	
	if(pFin > 100)
	{
		pFin = 100;
	}

	//console.log(lengths);
	//console.log(items.length);
	//finally output
			document.getElementById("fPlus").innerHTML = "<i class=\"medium material-icons\">trending_up</i><br>"+passGrade(Math.round(pFin));
			document.getElementById("fMinus").innerHTML = "<i class=\"medium material-icons\">trending_down</i><br>"+passGrade(Math.round(mFin));
			document.getElementById("fAvg").innerHTML = "<i class=\"medium material-icons\">trending_flat</i><br>"+passGrade(Math.round(aFin)) ;	
	}


function passGrade(x)
{
	//accept grade return according letter grade
	var lGrade;
	if(x < 50) 
	{
		lGrade = " (F)";
	}
	else if(x < 54 )
	{
		lGrade=" (P)";
	}
	else if(x<59)
	{
		lGrade= " (C-)";
	}
	else if(x<64)
	{
		lGrade= " (C)";
	}
	else if(x<69)
	{
		lGrade= " (C+)";
	}
	else if(x<74)
	{
		lGrade= " (B-)";
	}
	else if(x<79)
	{
		lGrade= " (B)";
	}
	else if(x<84)
	{
		lGrade= " (B+)";
	}
	else if(x<89)
	{
		lGrade= " (A-)";
	}
	else if(x<94)
	{
		lGrade= " (A)";
	}
	else
	{
		lGrade= " (A+)";
	}
	return (x + lGrade);
	}	
}

//trying to print the result
function printDiv(divName) {
     var printContents = "<html><head><link type=\"text/css\" rel=\"stylesheet\" href=\"http://localhost/douglas/3380/assign1P/assets/css/materialize.min.css\"  media=\"screen,projection\"/></head><body>"+document.getElementById(divName).innerHTML+"</body></html>";
     var originalContents = document.body.innerHTML;

     document.body.innerHTML = "<html><head><link type=\"text/css\" rel=\"stylesheet\" href=\"assets/css/materialize.min.css\"  media=\"screen,projection\"/></head><body>"+printContents+"</body></html>";

     window.print();

     document.body.innerHTML = originalContents;
}

function resetForm() {
    document.getElementById("form").innerHTML = "";
    var negative = document.getElementById("negative").options;
    var positive = document.getElementById("positive").options;
    negative.selected=false;
    positive.selected=false;
    document.getElementById("fPlus").innerHTML="";
    document.getElementById("fMinus").innerHTML="";
    document.getElementById("fAvg").innerHTML="";
    mRes = 0;
    aRes = 0;
    pRes = 0;
    cPercent = 0;
    tWeight = 0;
    cWeight = 0;
    mFin = 0;
    pFin = 0;
    for(var i=0;i<input.length;i++)
    {
		delete input[i];
	}
	count = 1;
   
    

}//end function
