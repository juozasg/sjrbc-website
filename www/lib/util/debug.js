import strftime from "./strftime.js"

function pausecomp(millis)
{
  var date = new Date();
  var curDate = null;
  do { curDate = new Date(); }
  while(curDate-date < millis);
}

Date.prototype.toString = function() {
  return strftime("%F %H:%M", this);
}