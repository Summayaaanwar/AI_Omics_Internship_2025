// (C) Wolfgang Huber 2010-2011

// Script parameters - these are set up by R in the function 'writeReport' when copying the 
//   template for this script from arrayQualityMetrics/inst/scripts into the report.

var highlightInitial = [ false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false ];
var arrayMetadata    = [ [ "1", "GSM2109532_BH12507-10_13018C_HG-U133_Plus_2.CEL.gz", "1", "2013-06-20T06:53:46Z" ], [ "2", "GSM2109533_BH12507-10_13018N_HG-U133_Plus_2.CEL.gz", "2", "2013-06-20T07:04:53Z" ], [ "3", "GSM2109534_BH12507-10_13059C_HG-U133_Plus_2.CEL.gz", "3", "2013-06-20T03:51:24Z" ], [ "4", "GSM2109535_BH12507-10_13059N_HG-U133_Plus_2.CEL.gz", "4", "2013-06-20T04:02:43Z" ], [ "5", "GSM2109536_BH12507-10_13082C_HG-U133_Plus_2.CEL.gz", "5", "2013-06-20T04:13:56Z" ], [ "6", "GSM2109537_BH12507-10_13082N_HG-U133_Plus_2.CEL.gz", "6", "2013-06-20T04:25:11Z" ], [ "7", "GSM2109538_BH12507-10_13111C_HG-U133_Plus_2.CEL.gz", "7", "2013-06-20T06:19:14Z" ], [ "8", "GSM2109539_BH12507-10_13111N_HG-U133_Plus_2.CEL.gz", "8", "2013-06-20T06:30:29Z" ], [ "9", "GSM2109540_BH12507-10_13112C_HG-U133_Plus_2.CEL.gz", "9", "2013-06-20T05:43:38Z" ], [ "10", "GSM2109541_BH12507-10_13112N_HG-U133_Plus_2.CEL.gz", "10", "2013-06-20T06:08:00Z" ], [ "11", "GSM2109542_BH12507-10_13116C_HG-U133_Plus_2.CEL.gz", "11", "2013-06-20T04:58:54Z" ], [ "12", "GSM2109543_BH12507-10_13116N_HG-U133_Plus_2.CEL.gz", "12", "2013-06-20T05:10:01Z" ], [ "13", "GSM2109544_BH12507-10_13117C_HG-U133_Plus_2.CEL.gz", "13", "2013-06-20T04:36:23Z" ], [ "14", "GSM2109545_BH12507-10_13117N_HG-U133_Plus_2.CEL.gz", "14", "2013-06-20T04:47:36Z" ], [ "15", "GSM2109546_BH12507-10_13119C_HG-U133_Plus_2.CEL.gz", "15", "2013-06-20T05:21:04Z" ], [ "16", "GSM2109547_BH12507-10_13119N_HG-U133_Plus_2.CEL.gz", "16", "2013-06-20T05:32:17Z" ], [ "17", "GSM2109548_BH12507-10_13130C_HG-U133_Plus_2.CEL.gz", "17", "2013-06-20T08:07:37Z" ], [ "18", "GSM2109549_BH12507-10_13130N_HG-U133_Plus_2.CEL.gz", "18", "2013-06-20T07:40:42Z" ], [ "19", "GSM2109550_BH12507-10_13132C_HG-U133_Plus_2.CEL.gz", "19", "2013-06-20T07:16:04Z" ], [ "20", "GSM2109551_BH12507-10_13132N_HG-U133_Plus_2.CEL.gz", "20", "2013-06-20T07:29:38Z" ] ];
var svgObjectNames   = [ "pca", "dens" ];

var cssText = ["stroke-width:1; stroke-opacity:0.4",
               "stroke-width:3; stroke-opacity:1" ];

// Global variables - these are set up below by 'reportinit'
var tables;             // array of all the associated ('tooltips') tables on the page
var checkboxes;         // the checkboxes
var ssrules;


function reportinit() 
{
 
    var a, i, status;

    /*--------find checkboxes and set them to start values------*/
    checkboxes = document.getElementsByName("ReportObjectCheckBoxes");
    if(checkboxes.length != highlightInitial.length)
	throw new Error("checkboxes.length=" + checkboxes.length + "  !=  "
                        + " highlightInitial.length="+ highlightInitial.length);
    
    /*--------find associated tables and cache their locations------*/
    tables = new Array(svgObjectNames.length);
    for(i=0; i<tables.length; i++) 
    {
        tables[i] = safeGetElementById("Tab:"+svgObjectNames[i]);
    }

    /*------- style sheet rules ---------*/
    var ss = document.styleSheets[0];
    ssrules = ss.cssRules ? ss.cssRules : ss.rules; 

    /*------- checkboxes[a] is (expected to be) of class HTMLInputElement ---*/
    for(a=0; a<checkboxes.length; a++)
    {
	checkboxes[a].checked = highlightInitial[a];
        status = checkboxes[a].checked; 
        setReportObj(a+1, status, false);
    }

}


function safeGetElementById(id)
{
    res = document.getElementById(id);
    if(res == null)
        throw new Error("Id '"+ id + "' not found.");
    return(res)
}

/*------------------------------------------------------------
   Highlighting of Report Objects 
 ---------------------------------------------------------------*/
function setReportObj(reportObjId, status, doTable)
{
    var i, j, plotObjIds, selector;

    if(doTable) {
	for(i=0; i<svgObjectNames.length; i++) {
	    showTipTable(i, reportObjId);
	} 
    }

    /* This works in Chrome 10, ssrules will be null; we use getElementsByClassName and loop over them */
    if(ssrules == null) {
	elements = document.getElementsByClassName("aqm" + reportObjId); 
	for(i=0; i<elements.length; i++) {
	    elements[i].style.cssText = cssText[0+status];
	}
    } else {
    /* This works in Firefox 4 */
    for(i=0; i<ssrules.length; i++) {
        if (ssrules[i].selectorText == (".aqm" + reportObjId)) {
		ssrules[i].style.cssText = cssText[0+status];
		break;
	    }
	}
    }

}

/*------------------------------------------------------------
   Display of the Metadata Table
  ------------------------------------------------------------*/
function showTipTable(tableIndex, reportObjId)
{
    var rows = tables[tableIndex].rows;
    var a = reportObjId - 1;

    if(rows.length != arrayMetadata[a].length)
	throw new Error("rows.length=" + rows.length+"  !=  arrayMetadata[array].length=" + arrayMetadata[a].length);

    for(i=0; i<rows.length; i++) 
 	rows[i].cells[1].innerHTML = arrayMetadata[a][i];
}

function hideTipTable(tableIndex)
{
    var rows = tables[tableIndex].rows;

    for(i=0; i<rows.length; i++) 
 	rows[i].cells[1].innerHTML = "";
}


/*------------------------------------------------------------
  From module 'name' (e.g. 'density'), find numeric index in the 
  'svgObjectNames' array.
  ------------------------------------------------------------*/
function getIndexFromName(name) 
{
    var i;
    for(i=0; i<svgObjectNames.length; i++)
        if(svgObjectNames[i] == name)
	    return i;

    throw new Error("Did not find '" + name + "'.");
}


/*------------------------------------------------------------
  SVG plot object callbacks
  ------------------------------------------------------------*/
function plotObjRespond(what, reportObjId, name)
{

    var a, i, status;

    switch(what) {
    case "show":
	i = getIndexFromName(name);
	showTipTable(i, reportObjId);
	break;
    case "hide":
	i = getIndexFromName(name);
	hideTipTable(i);
	break;
    case "click":
        a = reportObjId - 1;
	status = !checkboxes[a].checked;
	checkboxes[a].checked = status;
	setReportObj(reportObjId, status, true);
	break;
    default:
	throw new Error("Invalid 'what': "+what)
    }
}

/*------------------------------------------------------------
  checkboxes 'onchange' event
------------------------------------------------------------*/
function checkboxEvent(reportObjId)
{
    var a = reportObjId - 1;
    var status = checkboxes[a].checked;
    setReportObj(reportObjId, status, true);
}


/*------------------------------------------------------------
  toggle visibility
------------------------------------------------------------*/
function toggle(id){
  var head = safeGetElementById(id + "-h");
  var body = safeGetElementById(id + "-b");
  var hdtxt = head.innerHTML;
  var dsp;
  switch(body.style.display){
    case 'none':
      dsp = 'block';
      hdtxt = '-' + hdtxt.substr(1);
      break;
    case 'block':
      dsp = 'none';
      hdtxt = '+' + hdtxt.substr(1);
      break;
  }  
  body.style.display = dsp;
  head.innerHTML = hdtxt;
}
