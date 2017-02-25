
boBrowser=(typeof window != 'undefined' && window.document);

thisChanged=function(func,selfT){return function(){return func.apply(selfT,arguments);}}

thisChangedWArg=function(func,selfT,inObj){
  return function(){ var Arg = Array.prototype.slice.call(arguments); Arg.push(inObj); return func.apply(selfT,Arg);}
}



MyAsync=function(Func,finF){
  var self=this;
  this.Func=Func;   this.iSeries=0; this.Res=[]; this.resLast=undefined, this.finF=finF; 
  this.cb=function(err,res){ 
    self.storeRes(err,res);
    self.iSeries++; 
    console.log(self.iSeries+'/'+self.Func.length);
    if(err) console.log('Err '+err);
    if(err || self.iSeries>=self.Func.length) { console.log('Exit');  self.finF(err,self.Res); return}
    self.Func[self.iSeries](self.cb);
  };
}
MyAsync.prototype.storeRes=function(err,res){ 
  this.Res[this.iSeries]=res; this.resLast=res;
};
MyAsync.prototype.go=function(){
  this.Func[this.iSeries](this.cb);
}
MyAsync.prototype.doneNTrunk=function(err,res){this.Res[this.iSeries]=res;  this.Func=[]; this.iSeries=0; this.finF(err,self.Res);}
MyAsync.prototype.trunkNoFin=function(){}



calcKeySel=function(Prop, KeyCol){
  var KeySel=[];  for(var i=0;i<KeyCol.length;i++) { var key=KeyCol[i], b=Prop[key].b;   if(Number(b[bFlip.DBSel])) KeySel.push(key);  }
  return KeySel;
}

//
// String
//

ucfirst=function(string){  return string.charAt(0).toUpperCase() + string.slice(1);  }
lcfirst=function(string){  return string.charAt(0).toLowerCase() + string.slice(1);  }
isAlpha=function(star){  var regEx = /^[a-zA-Z0-9]+$/;  return str.match(regEx); } 
//String.prototype.trim = function(){ return this.replace(/^\s+|\s+$/g,"");}
if(!String.format){
  String.format = function(format){
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number){ 
      return typeof args[number]!='undefined' ? args[number]:match;
    });
  };
}

ltrim=function(str,charlist){
  if(charlist === undefined) charlist = "\\s";
  return str.replace(new RegExp("^[" + charlist + "]+"), "");
};
rtrim=function(str,charlist){
  if (charlist === undefined) charlist = "\\s";
  return str.replace(new RegExp("[" + charlist + "]+$"), "");
};

//pad2=function(n){ return ('0'+n).slice(-2);}
pad2=function(n){return (n<10?'0':'')+n;}
calcLabel=function(Label,strName){ var strLabel=ucfirst(strName); if(strName in Label) strLabel=Label[strName]; return strLabel;}


//
// Array
//

arr_max=function(arr){return Math.max.apply(null, arr);}
arr_min=function(arr){return Math.min.apply(null, arr);}

arrArrange=function(arrV,arrI){
  var arrNew=[]; if(typeof arrV=='string') arrNew='';
  //for(var i=0;i<arrI.length;i++){    arrNew.push(arrV[arrI[i]]);    }
  for(var i=0;i<arrI.length;i++){    arrNew[i]=arrV[arrI[i]];    }
  return arrNew;
}

//intersectionAB=function(A,B){return A.filter(function(ai){return B.indexOf(ai)!=-1;});}  // Loop through A; remove ai that is not in B
//AmB=function(A,B){return A.filter(function(ai){return B.indexOf(ai)==-1;});}  // Loop through A; remove ai that is in B
intersectionAB=function(A,B){var Rem=[]; for(var i=A.length-1;i>=0;i--){var a=A[i]; if(B.indexOf(a)==-1) A.splice(i,1); else Rem.push(a);} return Rem.reverse();}  // Changes A, returns the remainder
AMinusB=function(A,B){var ANew=[]; for(var i=0;i<A.length;i++){var a=A[i]; if(B.indexOf(a)==-1) ANew.push(a);} return ANew;}  // Does not change A, returns ANew
AMinusBM=function(A,B){var Rem=[]; for(var i=A.length-1;i>=0;i--){var a=A[i]; if(B.indexOf(a)==-1) Rem.push(a); else A.splice(i,1);} return Rem.reverse();}  // Changes A, returns the remainder
myIntersect=function(A,B){var arrY=[],arrN=[]; for(var i=0; i<A.length; i++){var a=A[i]; if(B.indexOf(a)==-1) arrN.push(a); else arrY.push(a);} return [arrY,arrN];}  
intersectBool=function(A,B){for(var i=0; i<A.length; i++){if(B.indexOf(A[i])!=-1) return true;} return false;}  //  If any 'a' within B
isAWithinB=function(A,B){ for(var i=0; i<A.length; i++){if(B.indexOf(A[i])==-1) return false;} return true;}  


mySplice1=function(arr,iItem){ var item=arr[iItem]; for(var i=iItem, len=arr.length-1; i<len; i++)  arr[i]=arr[i+1];  arr.length = len; return item; }  // GC-friendly splice
myCopy=function(arr,brr){  if(typeof arr=="undefined") arr=[]; for(var i=0, len=brr.length; i<len; i++)  arr[i]=brr[i];  arr.length = len; return arr; }  // GC-friendly copy
//myCopy=function(arr,brr){  if(typeof arr=="undefined") arr=[]; arr.length=0; arr.push.apply(arr,brr);  }  // GC-friendly copy
myCompare=function(arr,brr){  var la=arr.length,lb=brr.length; if(la!=lb) return false; for(var i=0; i<la; i++)  if(arr[i]!=brr[i]) return false;  return true;}  // compare
  

addIndexColumn=function(M){    var Mt=Array();     for(var i=0;i<M.length;i++){  var tmp=[(i+1).toString()];   Mt[i]=tmp.concat(M[i]);  }       return Mt;      }
arrCopy=function(A){return [].concat(A);}

arrarrCopy=function(B){var A=[]; for(var i=0;i<B.length;i++){ A[i]=[].concat(B[i]);} return A; }

array_removeInd=function(a,i){a.splice(i,1);}

array_splice=function(arr,st,len,arrIns){
  [].splice.apply(arr, [st,len].concat(arrIns));
}
array_merge=function(){  return Array.prototype.concat.apply([],arguments);  } // Does not modify origin
//array_mergeM=function(a,b){  a.push.apply(a,b); return a; } // Modifies origin (first argument)
array_mergeM=function(){var t=[], a=arguments[0], b=t.slice.call(arguments, 1), c=t.concat.apply([],b); t.push.apply(a,c); return a; } // Modifies origin (first argument)

array_flip=function(A){ var B={}; for(var i=0;i<A.length;i++){B[A[i]]=i;} return B;}
array_fill=function(n, val){ return Array.apply(null, new Array(n)).map(String.prototype.valueOf,val); }

is_array=function(a){return a instanceof Array;}
in_array=function(needle,haystack){ return haystack.indexOf(needle)!=-1;}
array_filter=function(A,f){f=f||function(a){return a;}; return A.filter(f);}


range=function(min,max,step){ var n=(max-min)/step; return Array.apply(null, Array(n)).map(function(trash, i){return min+i*step;}); }

eliminateDuplicates=function(arr){
  var i, len=arr.length, out=[], obj={};
  for (i=0;i<len;i++){ obj[arr[i]]=0; }
  for (i in obj){ out.push(i); }
  return out;
}
arrValMerge=function(arr,val){  var indOf=arr.indexOf(val); if(indOf==-1) arr.push(val); }
//arrValRemove=function(arr,val){  var indOf=arr.indexOf(val); if(indOf!=-1) arr.splice(indOf,1); }
arrValRemove=function(arr,val){  var indOf=arr.indexOf(val); if(indOf!=-1) mySplice1(arr,indOf); }

var stepN=function(start,n,step){ if(typeof step=='undefined') step=1;  var arr=Array(n),ii=start; for(var i=0;i<n;i++){ arr[i]=ii;ii+=step;} return arr; }


//
// Str (Array of Strings)
//

StrComp=function(A,B){var lA=A.length; if(lA!==B.length) return false; for(var i=0;i<lA;i++){ if(A[i]!==B[i]) return false;} return true;}
Str_insertM=function(arr,strRefVal,arrIns,boBefore){
  var i=arr.indexOf(strRefVal); if(i==-1) throw 'bla';  if(typeof boBefore=='undefined' || boBefore==0) i++; 
  if(!(arrIns instanceof Array)) arrIns=[arrIns];
  array_splice(arr, i, 0, arrIns);
}
Str_moveM=function(arr,strRefVal,arrMove,boBefore){
  if(!(arrMove instanceof Array)) arrMove=[arrMove];
  removeBFrA(arr,arrMove);
  Str_insertM(arr,strRefVal,arrMove,boBefore);
  //return arrRem;
}


//
// Object
//

object_values=function(obj){
  var arr=[];      for(var name in obj) arr.push(obj[name]);
  return arr;
}

copy=function(o, isdeep){
    if (o===undefined || o===null || ['string', 'number', 'boolean'].indexOf(typeof o)!==-1)
        return o;
    var n= o instanceof Array? [] :{};
    for (var k in o)
        if (o.hasOwnProperty(k))
            n[k]= isdeep? copy(o[k], isdeep) : o[k];
    return n;
}
copySome=function(a,b,Str){for(var i=0;i<Str.length;i++) { var name=Str[i]; a[name]=b[name]; } return a; }

/*JSON.myParse=function(str){
    try{
        return [null, JSON.parse(str)];
    }catch(err){
        return [err, undefined];
    }
}*/


//
// Misc
//
parseQS=function(str){
  var params = {},      regex = /([^&=]+)=([^&]*)/g, m;
  while (m = regex.exec(str)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  return params;
}
/////////////////////////////////////////////////////////////////////



extractLoc=function(obj,strObjName){   // Ex: eval(extractLoc(objMy,'objMy'));
  var Str=[];  for(var key in obj) Str.push(key+'='+strObjName+'.'+key);
  var str=''; if(Str.length) str='var '+Str.join(', ')+';';  return str;
}
//extract=function(obj){  for(var key in obj){  window[key]=obj[key];  }  }
extract=function(obj,par){
  if(typeof par=='undefined') par=app; for(var key in obj){
    par[key]=obj[key];
  }
}
extractLocSome=function(strObjName,arrSome){  // Ex: eval(extractLocSome('objMy',['a','b']));
  if(typeof arrSome=='string') arrSome=[arrSome];
  var len=arrSome.length, Str=Array(len);  for(var i=0;i<len;i++) { var key=arrSome[i]; Str[i]=key+'='+strObjName+'.'+key; }
  return 'var '+Str.join(', ')+';';
}

//
// Data Formatting
//

arrObj2TabNStrCol=function(arrObj){ //  Ex: [{abc:0,def:1},{abc:2,def:3}] => {tab:[[0,1],[2,3]],StrCol:['abc','def']}
  var Ou={tab:[]}, lenI=arrObj.length, StrCol=[]; if(!lenI) return Ou;
  StrCol=Object.keys(arrObj[0]);  var lenJ=StrCol.length;
  for(var i=0;i<lenI;i++) {
    var row=arrObj[i], rowN=Array(lenJ);
    for(var j=0;j<lenJ;j++){ var key=StrCol[j]; rowN[j]=row[key]; }
    Ou.tab.push(rowN);
  }
  Ou.StrCol=StrCol;
  return Ou;
}
tabNStrCol2ArrObj=function(tabNStrCol){  //Ex: {tab:[[0,1],[2,3]],StrCol:['abc','def']}    =>    [{abc:0,def:1},{abc:2,def:3}] 
  var tab=tabNStrCol.tab, StrCol=tabNStrCol.StrCol, arrObj=Array(tab.length);
  for(var i=0;i<tab.length;i++){
    var row={};
    for(var j=0;j<StrCol.length;j++){  var key=StrCol[j]; row[key]=tab[i][j];  }
    arrObj[i]=row;
  }
  return arrObj;
}



function_mod=function(func,addF,boAppend){
  var tmpf=func;
  if(typeof boAppend=='undefined' || boAppend==1) func=function(){ tmpf.apply(this, arguments); addF.apply(this, arguments);  };
  else func=function(){ addF.apply(this, arguments); tmpf.apply(this, arguments); };
  return func;
}

print_r=function(o,boHTML){
  var tmp=JSON.stringify(o,null,'\t');
  if(typeof(boHTML) !='undefined' && boHTML) tmp=tmp.replace(/\n/g,'<br>').replace(/\t/g,'&nbsp;&nbsp;&nbsp;'); return tmp;
}






//
// Dates and time
//

Date.prototype.toUnix=function(){return Math.round(this.valueOf()/1000);}
Date.prototype.toISOStringMy=function(){return this.toISOString().substr(0,19);}
swedDate=function(tmp){ if(tmp){tmp=UTC2JS(tmp);  tmp=tmp.getFullYear()+'-'+pad2(tmp.getMonth()+1)+'-'+pad2(tmp.getDate());}  return tmp;}
UTC2JS=function(utcTime){ var tmp=new Date(Number(utcTime)*1000);  return tmp;  }
UTC2Readable=function(utcTime){ var tmp=new Date(Number(utcTime)*1000);   return tmp.toLocaleString();  }
//myISODATE=function(d){ return d.toISOString().substr(0,19);}
//unixNowMS=function(){var tmp=new Date(); return Number(tmp);}
//unixNow=function(){return Math.round(unixNowMS()/1000);}
unixNow=function(){return (new Date()).toUnix();}

getSuitableTimeUnit=function(t){ // t in seconds
  var tabs=Math.abs(t), tsign=t>=0?+1:-1;
  if(tabs<=90) return [tsign*tabs,'s'];
  tabs/=60; // t in minutes
  if(tabs<=90) return [tsign*tabs,'m']; 
  tabs/=60; // t in hours
  if(tabs<=36) return [tsign*tabs,'h'];
  tabs/=24; // t in days
  if(tabs<=2*365) return [tsign*tabs,'d'];
  tabs/=365; // t in years
  return [tsign*tabs,'y'];
}


UTC2ReadableDiff=function(tdiff,boLong,boArr){
  if(typeof boLong =='undefined' ) boLong=0;
  if(typeof boArr =='undefined' ) boArr=0;
  //var tmp;  tmp=approxTimeDuration(tdiff,boLong,boArr);
  var tmp=getSuitableTimeUnit(tdiff), n=Math.round(tmp[0]), indA=tmp[1];
  if(indA=='m') indA='min';
  var j1=0, j2=1; if(boLong==1){j1=2; j2=3;}
  var unit=langHtml.timeUnit, units=unit[indA][j1]; if(n!=1) units=unit[indA][j2];

  if(boArr==1){  return [n,units];  }
  else{
    var tmp=n+' '+units;  if(tdiff<0) tmp='-';
    return tmp;
  }
}

//
// Random
//

randomHash=function(){ return Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2);}

randomInt=function(min, max){    return min + Math.floor(Math.random() * (max - min + 1));  } // Random integer in the intervall [min, max] (That is including both min and max)

gauss=function(){   // returns random number with normal distribution N(0,1)  (mean=0,  std dev=1)
  var x=Math.random(), y=Math.random();

  // two independent variables with normal distribution N(0,1)
  var u=Math.sqrt(-2*Math.log(x))*Math.cos(2*Math.PI*y);
  var v=Math.sqrt(-2*Math.log(x))*Math.sin(2*Math.PI*y);

  // i will return only one, couse only one needed
  return u;
}

gauss_ms=function(m,s){  // returns random number with normal distribution: N(m,s)  (mean=m,  std dev=s)
  if(typeof m=='undefined') m=0; if(typeof s=='undefined') s=1;
  return gauss()*s+m;
}


//
// Math
//

isNumber=function(n){ return !isNaN(parseFloat(n)) && isFinite(n);}
sign=function(val){if(val<0) return -1; else if(val>0) return 1; else return 0;}

twoPi=2*Math.PI;
if(typeof(Number.prototype.toRad) === "undefined"){  Number.prototype.toRad = function(){  return this * Math.PI / 180; }   }
Math.log2=function(val) {  return Math.log(val) / Math.LN2; }
Math.log10=function(val) {  return Math.log(val) / Math.LN10; }

bound=function(value, opt_min, opt_max){
  if (opt_min != null) value = Math.max(value, opt_min);
  if (opt_max != null) value = Math.min(value, opt_max);
  return value;
}
closest2Val=function(v, val){
  var bestFit=Number.MAX_VALUE, curFit, len=v.length, best_i;
  for(var i=0;i<len;i++){
    curFit=Math.abs(v[i]-val);
    if(curFit<bestFit){bestFit=curFit; best_i=i;}
  }
  return [v[best_i],best_i];
}
normalizeAng=function(angIn, angCenter, lapSize){
  if(typeof angCenter=='undefined') angCenter=0;
  if(typeof lapSize=='undefined') lapSize=twoPi;

  var angOut,nLapsCorrection;
  var lapSizeHalf=lapSize/2;

  var upper=angCenter+lapSizeHalf, lower=angCenter-lapSizeHalf, angInTransfer=angIn-angCenter;
  var tmp;
  if(angIn>=upper){tmp=angInTransfer+lapSizeHalf; nLapsCorrection=Math.floor(tmp/lapSize);}
  else if(angIn<lower){tmp=angInTransfer+lapSizeHalf; nLapsCorrection=Math.floor(tmp/lapSize);}
  else return [angIn,0];
  
  angOut=angIn-nLapsCorrection*lapSize;  

  return [angOut,nLapsCorrection];
}

distCalc=function(lng1,lat1,lng2,lat2){
  var R = 6371; // km
  //var dLat = (lat2-lat1).toRad();
  //var dLng = (lng2-lng1).toRad();
  var lng1 = Number(lng1).toRad(),  lat1 = Number(lat1).toRad();
  var lng2 = Number(lng2).toRad(),  lat2 = Number(lat2).toRad();
  var dLat = lat2-lat1,   dLng = lng2-lng1;

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLng/2) * Math.sin(dLng/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;
  return d;
}

approxDist=function(mWhole,boArr){  
  if(typeof boArr !='undefined' && boArr==1){} else boArr=0;
  var n, u; 
  var aMWhole=Math.abs(mWhole);
  if(mWhole>=1000){n=Math.round(mWhole/(1000)); u='km';} 
  else{n=mWhole;  u='m';} 
  if(boArr==1) return Array(n,u); else return n+' '+u;
}


//
// MercatorProjection
//

var TILE_SIZE = 256;

degreesToRadians=function(deg){  return deg*(Math.PI/180);  }
radiansToDegrees=function(rad){  return rad/(Math.PI/180);  }

MercatorProjection=function(){
  this.pOrg = [TILE_SIZE/2, TILE_SIZE/2];
  this.pixelsPerLonDegree_ = TILE_SIZE/360;
  this.pixelsPerLonRadian_ = TILE_SIZE/(2*Math.PI);
}
MercatorProjection.prototype.fromLatLngToPoint = function(latLng, opt_point){
  var point = opt_point || new google.maps.Point(0, 0);
  var xOrg=this.pOrg[0], yOrg=this.pOrg[1];
  point.x = xOrg + latLng.lng() * this.pixelsPerLonDegree_;

  var siny = bound(Math.sin(degreesToRadians(latLng.lat())), -0.9999, 0.9999);
  point.y = yOrg + 0.5 * Math.log((1 + siny) / (1 - siny)) * -this.pixelsPerLonRadian_;
  return point;
};
MercatorProjection.prototype.fromLatLngToPointV=function(latLng){
  var lat, lng;    if(latLng instanceof Array) {lat=latLng[0]; lng=latLng[1]; } else { lat=latLng.lat(); lng=latLng.lng();}
  var pOut=Array(2);
  var xOrg=this.pOrg[0], yOrg=this.pOrg[1];
  pOut[0]=xOrg+lng*this.pixelsPerLonDegree_;

  var siny = bound(Math.sin(degreesToRadians(lat)), -0.9999, 0.9999);
  pOut[1]=yOrg + 0.5*Math.log( (1+siny)/(1-siny) ) * -this.pixelsPerLonRadian_;
  return pOut;
}
MercatorProjection.prototype.fromPointToLatLng = function(point,noWrap){
  var x, y;    if(point instanceof Array) {x=point[0]; y=point[1]; } else { x=point.x; y=point.y;}
  var xOrg=this.pOrg[0], yOrg=this.pOrg[1];
  var lng = (x - xOrg) / this.pixelsPerLonDegree_;
  var latRadians = (y - yOrg) / -this.pixelsPerLonRadian_;
  var lat = radiansToDegrees(2 * Math.atan(Math.exp(latRadians)) - Math.PI/2);
  return new google.maps.LatLng(lat, lng, noWrap);
};
MercatorProjection.prototype.fromPointToLatLngV = function(point){
  var x, y;    if(point instanceof Array) {x=point[0]; y=point[1]; } else { x=point.x; y=point.y;}
  var xOrg=this.pOrg[0], yOrg=this.pOrg[1];
  var lng = (x-xOrg) / this.pixelsPerLonDegree_;
  var latRadians = (y-yOrg) / -this.pixelsPerLonRadian_;
  var lat = radiansToDegrees(2 * Math.atan(Math.exp(latRadians)) - Math.PI/2);
  return [lat, lng];
};
MercatorProjection.prototype.getBounds=function(c,z,size){
  var zf=Math.pow(2, z)*2;
  var dw=size[0]/zf, dh=size[1]/zf;
  var sw=[c[0]-dw, c[1]+dh];
  var ne=[c[0]+dw, c[1]-dh];
  return [sw,ne];
}





//
// Obsolete
//
/*
reload=function(){ confirm('reload'); window.location.reload(); }
htmlDecode=function(input){ var e = document.createElement('div');    e.innerHTML = input;     return e.childNodes[0].nodeValue;  }
//getScrollHeight=function(){ var h; if($.browser.msie)  h=document.getElementsByTagName('body')[0].scrollHeight;   else h=document.body.parentNode.scrollHeight;   return h;  }
getColor = function(val, range){  var s=100, l=50, a=1,    h = 240-Math.round((240 / range) * val);      return "hsla("+h+","+s+"%,"+l+"%,"+a+")";    };
*/
