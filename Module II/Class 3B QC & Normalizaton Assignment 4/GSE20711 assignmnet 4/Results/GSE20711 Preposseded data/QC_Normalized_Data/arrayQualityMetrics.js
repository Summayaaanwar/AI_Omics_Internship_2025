// (C) Wolfgang Huber 2010-2011

// Script parameters - these are set up by R in the function 'writeReport' when copying the 
//   template for this script from arrayQualityMetrics/inst/scripts into the report.

var highlightInitial = [ false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, true, false, false, false, false, false, false ];
var arrayMetadata    = [ [ "1", "GSM519722.CEL.gz", "1", "09/04/09 12:34:23" ], [ "2", "GSM519723.CEL.gz", "2", "09/04/09 12:23:06" ], [ "3", "GSM519724.CEL.gz", "3", "09/04/09 14:51:23" ], [ "4", "GSM519725.CEL.gz", "4", "09/04/09 12:45:39" ], [ "5", "GSM519726.CEL.gz", "5", "09/04/09 15:15:01" ], [ "6", "GSM519727.CEL.gz", "6", "09/04/09 13:55:03" ], [ "7", "GSM519728.CEL.gz", "7", "09/04/09 13:43:50" ], [ "8", "GSM519729.CEL.gz", "8", "09/04/09 13:32:36" ], [ "9", "GSM519730.CEL.gz", "9", "09/04/09 15:37:23" ], [ "10", "GSM519731.CEL.gz", "10", "09/04/09 15:03:37" ], [ "11", "GSM519732.CEL.gz", "11", "09/04/09 15:48:42" ], [ "12", "GSM519733.CEL.gz", "12", "09/04/09 15:26:10" ], [ "13", "GSM519734.CEL.gz", "13", "09/04/09 12:56:45" ], [ "14", "GSM519735.CEL.gz", "14", "09/04/09 13:08:05" ], [ "15", "GSM519736.CEL.gz", "15", "09/04/09 14:06:16" ], [ "16", "GSM519737.CEL.gz", "16", "09/04/09 13:19:12" ], [ "17", "GSM519738.CEL.gz", "17", "09/04/09 14:17:29" ], [ "18", "GSM519739.CEL.gz", "18", "09/04/09 14:28:40" ], [ "19", "GSM519740.CEL.gz", "19", "09/04/09 14:40:03" ], [ "20", "GSM519741.CEL.gz", "20", "09/08/09 15:16:00" ], [ "21", "GSM519742.CEL.gz", "21", "09/08/09 15:28:42" ], [ "22", "GSM519743.CEL.gz", "22", "09/08/09 14:56:23" ], [ "23", "GSM519744.CEL.gz", "23", "09/08/09 13:26:14" ], [ "24", "GSM519745.CEL.gz", "24", "09/08/09 15:54:06" ], [ "25", "GSM519746.CEL.gz", "25", "09/08/09 15:41:24" ], [ "26", "GSM519747.CEL.gz", "26", "09/08/09 14:05:27" ], [ "27", "GSM519748.CEL.gz", "27", "09/08/09 14:30:57" ], [ "28", "GSM519749.CEL.gz", "28", "09/08/09 12:11:47" ], [ "29", "GSM519750.CEL.gz", "29", "09/08/09 11:47:00" ], [ "30", "GSM519751.CEL.gz", "30", "09/08/09 11:59:21" ], [ "31", "GSM519752.CEL.gz", "31", "09/08/09 12:24:30" ], [ "32", "GSM519753.CEL.gz", "32", "09/08/09 13:38:55" ], [ "33", "GSM519754.CEL.gz", "33", "09/08/09 14:18:16" ], [ "34", "GSM519755.CEL.gz", "34", "09/09/09 16:07:12" ], [ "35", "GSM519756.CEL.gz", "35", "09/09/09 16:40:51" ], [ "36", "GSM519757.CEL.gz", "36", "09/09/09 12:56:21" ], [ "37", "GSM519758.CEL.gz", "37", "09/09/09 15:55:57" ], [ "38", "GSM519759.CEL.gz", "38", "09/09/09 12:11:33" ], [ "39", "GSM519760.CEL.gz", "39", "09/09/09 12:34:05" ], [ "40", "GSM519761.CEL.gz", "40", "09/09/09 13:18:47" ], [ "41", "GSM519762.CEL.gz", "41", "09/09/09 16:52:12" ], [ "42", "GSM519763.CEL.gz", "42", "09/09/09 16:29:29" ], [ "43", "GSM519764.CEL.gz", "43", "09/09/09 12:22:48" ], [ "44", "GSM519765.CEL.gz", "44", "09/09/09 14:48:03" ], [ "45", "GSM519767.CEL.gz", "45", "09/09/09 14:36:47" ], [ "46", "GSM519768.CEL.gz", "46", "09/09/09 14:59:19" ], [ "47", "GSM519769.CEL.gz", "47", "09/09/09 14:03:10" ], [ "48", "GSM519770.CEL.gz", "48", "09/09/09 14:14:10" ], [ "49", "GSM519771.CEL.gz", "49", "09/09/09 15:10:38" ], [ "50", "GSM519772.CEL.gz", "50", "09/09/09 14:25:28" ], [ "51", "GSM519773.CEL.gz", "51", "09/09/09 15:33:08" ], [ "52", "GSM519774.CEL.gz", "52", "09/09/09 15:44:31" ], [ "53", "GSM519775.CEL.gz", "53", "09/09/09 13:49:59" ], [ "54", "GSM519776.CEL.gz", "54", "09/09/09 16:18:12" ], [ "55", "GSM519777.CEL.gz", "55", "09/10/09 13:07:21" ], [ "56", "GSM519778.CEL.gz", "56", "09/10/09 11:52:54" ], [ "57", "GSM519779.CEL.gz", "57", "09/10/09 12:04:18" ], [ "58", "GSM519780.CEL.gz", "58", "09/10/09 13:41:06" ], [ "59", "GSM519781.CEL.gz", "59", "09/10/09 17:02:20" ], [ "60", "GSM519782.CEL.gz", "60", "09/10/09 16:28:31" ], [ "61", "GSM519783.CEL.gz", "61", "09/10/09 15:54:36" ], [ "62", "GSM519784.CEL.gz", "62", "09/10/09 16:05:52" ], [ "63", "GSM519785.CEL.gz", "63", "09/10/09 16:17:13" ], [ "64", "GSM519786.CEL.gz", "64", "09/10/09 15:31:53" ], [ "65", "GSM519787.CEL.gz", "65", "09/10/09 14:15:21" ], [ "66", "GSM519788.CEL.gz", "66", "09/11/09 14:02:15" ], [ "67", "GSM519789.CEL.gz", "67", "09/11/09 13:43:18" ], [ "68", "GSM519790.CEL.gz", "68", "09/10/09 14:40:35" ], [ "69", "GSM519791.CEL.gz", "69", "09/10/09 13:18:30" ], [ "70", "GSM519792.CEL.gz", "70", "09/10/09 12:27:10" ], [ "71", "GSM519793.CEL.gz", "71", "09/10/09 12:15:41" ], [ "72", "GSM519794.CEL.gz", "72", "09/10/09 15:15:39" ], [ "73", "GSM519795.CEL.gz", "73", "09/10/09 16:39:34" ], [ "74", "GSM519796.CEL.gz", "74", "09/10/09 13:52:29" ], [ "75", "GSM519797.CEL.gz", "75", "09/10/09 13:29:45" ], [ "76", "GSM519798.CEL.gz", "76", "09/10/09 14:26:43" ], [ "77", "GSM519799.CEL.gz", "77", "09/10/09 14:04:00" ], [ "78", "GSM519800.CEL.gz", "78", "09/10/09 11:17:39" ], [ "79", "GSM519801.CEL.gz", "79", "09/10/09 16:50:56" ], [ "80", "GSM519802.CEL.gz", "80", "09/10/09 11:06:14" ], [ "81", "GSM519803.CEL.gz", "81", "09/10/09 14:51:50" ], [ "82", "GSM519804.CEL.gz", "82", "09/10/09 15:04:16" ], [ "83", "GSM519805.CEL.gz", "83", "09/10/09 15:43:16" ], [ "84", "GSM519806.CEL.gz", "84", "09/10/09 11:29:04" ], [ "85", "GSM519807.CEL.gz", "85", "09/11/09 11:37:42" ], [ "86", "GSM519808.CEL.gz", "86", "09/11/09 10:29:41" ], [ "87", "GSM519809.CEL.gz", "87", "09/11/09 11:15:09" ], [ "88", "GSM519810.CEL.gz", "88", "09/11/09 10:18:21" ], [ "89", "GSM519811.CEL.gz", "89", "09/11/09 11:26:28" ], [ "90", "GSM519812.CEL.gz", "90", "09/11/09 12:01:07" ] ];
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
