//call on startup
function init()
{
	var body = document.body;
	body.style.backgroundColor = "#000000";
	body.style.margin = "0px";
	body.style.overflow = "hidden";
	
	window.addEventListener("resize", resize);
	
	var musicForm = document.createElement("div");
	musicForm.id = "mForm";
	
	var mFile = document.createElement("input");
	mFile.id = "mFile";
	mFile.type = "file";
	mFile.backgroundColor = "#00FFFF";
	
	var cFile = document.createElement("input");
	cFile.id = "cFile";
	cFile.type = "file";
	
	var sub = document.createElement("input");
	sub.type = "button";
	sub.onclick = submitFiles;
	
	musicForm.appendChild(mFile);
	musicForm.appendChild(cFile);
	musicForm.appendChild(sub);
	body.appendChild(musicForm);
}

//Called when submit button pressed
function submitFiles()
{
	var mForm = document.getElementById("mForm");
	var mFile = document.getElementById("mFile");
	
	//check if audio/video file provided
	if(!mFile.files || !mFile.files[0])
		return;
	playback(mFile.files[0]);
	
	//check if chart file provided
	var cFile = document.getElementById("cFile");
	if(!cFile.files || !cFile.files[0])
	{
		mForm.remove();
		return;
	}
	parseChart(cFile.files[0]);
	mForm.remove();
}

//Called once chart file finished loading
function setChart()
{
	//keanu related stuff	
}

//Present error message in window
function showError(phrase)
{
	//vertrak shall provide if necessary
}