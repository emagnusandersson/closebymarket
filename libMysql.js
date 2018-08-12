//
// My old mysql interface
// Used in libReq.js, filterServer.js and in most BE requsts except loginGetGraph
// 

myQueryGen=function*(flow, sql, Val, pool){ 
  var err, connection, results, fields;
  for(var i=0;i<nDBRetry;i++){
    pool.getConnection(function(errT, connectionT) { err=errT; connection=connectionT; flow.next(); }); yield;
    if(err) {
      console.log('Error when getting mysql connection, attemptCounter: '+i);
      if(typeof err=='object' && 'code' in err) {
        console.log('err.code: '+err.code);
        if(err.code=='PROTOCOL_CONNECTION_LOST' || err.code=='ECONNREFUSED' || err.code=='ECONNRESET'){
          setTimeout(function(){ flow.next();}, 2000); yield;  continue;
        } else { console.log('Can\'t handle: err.code: '+err.code); return [err]; }
      }
      else { console.log('No \'code\' in err'); return [err]; }
    }
  
    connection.query(sql, Val, function(errT, resultsT, fieldsT) { err=errT; results=resultsT; fields=fieldsT; flow.next();}); yield;
    connection.release();
    if(err) {
      console.log('Error when making mysql query, attemptCounter: '+i);
      if(typeof err=='object' && 'code' in err) {
        console.log('err.code: '+err.code); debugger
        if(err.code=='PROTOCOL_CONNECTION_LOST' || err.code=='ECONNREFUSED'){
          setTimeout(function(){ flow.next();}, 2000); yield;   continue;
        } else { console.log('Can\'t handle: err.code: '+err.code); break; }
      }
      else { console.log('No \'code\' in err'); break; }
    }
    else {break;}
  }
  return [err, results, fields];
}

//
// My new mysql interface
// Used in loginGetGraph
// 

mysqlGetConnection=function*(flow, pool){
  var err, connection;      pool.getConnection(function(errT, connectionT) { err=errT; connection=connectionT; flow.next(); }); yield;   return [err, connection];
}
mysqlStartTransaction=function*(flow, connection){
  var err;     connection.beginTransaction(function(errT) { err=errT; flow.next(); }); yield;   if(err) return [err];
  connection.myTransactionState='started';
  return [null];
}
mysqlQuery=function*(flow, connection, sql, Val){
  var err, results, fields;    connection.query(sql, Val, function (errT, resultsT, fieldsT) { err=errT; results=resultsT; fields=fieldsT; flow.next(); }); yield;   return [err, results, fields];
}
mysqlRollback=function*(flow, connection){  connection.rollback(function() { flow.next(); }); yield;   }  // not used
mysqlCommit=function*(flow, connection){    // not used
  var err; connection.commit(function(errT){ err=errT; flow.next(); }); yield;   return [err];
}
mysqlRollbackNRelease=function*(flow, connection){  connection.rollback(function() { flow.next(); }); yield;  connection.release(); }
mysqlCommitNRelease=function*(flow, connection){
  var err; connection.commit(function(errT){ err=errT; flow.next(); }); yield;  connection.release();  return [err];
}





   
  // accountMerge: The arguments: idUser, idFB, idIdPlace, idOpenId and email may point to different accounts. If so, then those accounts should be merged.
  // Any of the above mentioned arguments may be null.
accountMerge=function*(objArg){
  var req=this.req, flow=req.flow, site=req.site, ORole=site.ORole, {userTab, customerTab, sellerTab, complaintTab}=site.TableName;
  var con=this.con;
  var {idUser, idFB, idIdPlace, idOpenId, email, nameIP, image}=objArg, Ou={idUser:null};
  var StrMes=[];
  var donatedAmount=0, nComplaint=0, nComplaintCum=0, nComplaintGiven=0, nComplaintGivenCum=0; 
  var sql="SELECT * FROM "+userTab+" WHERE idUser=? OR idFB=? OR idIdPlace=? OR idOpenId=? OR email=? ORDER BY tCreated";
  var Val=[idUser, idFB, idIdPlace, idOpenId, email];
  var [err, resultsU]=yield* mysqlQuery(flow, con, sql, Val); if(err) return [err];
  var nU=resultsU.length;
  //if(nU==0) {
    //if(objArg.boCreate){
      //var Sql=[];
      //Sql.push("INSERT INTO "+userTab+" (idFB, idIdPlace, idOpenId, email, nameIP, image, hashPW) VALUES (?, ?, ?, ?, ?, ?, MD5(RAND()) );");
      //Sql.push("SELECT LAST_INSERT_ID() AS idUser;");
      //var sql=Sql.join('\n'), Val=[idFB, idIdPlace, idOpenId, email, nameIP, image];
      //var [err, results]=yield* mysqlQuery(flow, con, sql, Val); if(err) return [err];
      //Ou.idUser=results[1][0].idUser;
    //}
  //}else
  if(nU==1) {
    var rowT=resultsU[0];
    var sql="UPDATE "+userTab+" SET idFB=IF(? IS NULL, idFB, ?), idIdPlace=IF(? IS NULL, idIdPlace, ?), idOpenId=IF(? IS NULL, idOpenId, ?), email=IF(? IS NULL, email, ?), nameIP=IF(? IS NULL, nameIP, ?), image=IF(? IS NULL, image, ?) WHERE idUser=?;";
    var Val=[idFB, idFB, idIdPlace, idIdPlace, idOpenId, idOpenId, email, email, nameIP, nameIP, image, image,   rowT.idUser]; 
    var [err, results]=yield* mysqlQuery(flow, con, sql, Val); if(err) return [err];
    Ou.idUser=rowT.idUser;
  }else if(nU>1) {
    var tCreatedU=Infinity, iBestU=0, ValU=[];
    for(var i=0;i<nU;i++){
      var rowT=resultsU[i];
      idFB=idFB||rowT.idFB;  idIdPlace=idIdPlace||rowT.idIdPlace;  idOpenId=idOpenId||rowT.idOpenId;  email=email||rowT.email;
      donatedAmount+=rowT.donatedAmount; nComplaint+=rowT.nComplaint; nComplaintGiven+=rowT.nComplaintGiven; nComplaintCum+=rowT.nComplaintCum; nComplaintGivenCum+=rowT.nComplaintGivenCum;
      if(rowT.tCreated<tCreatedU) {tCreatedU=rowT.tCreated; iBestU=i;}
      ValU.push(resultsU[i].idUser);
    }
    var rowBest=resultsU[iBestU], idUserUBest=rowBest.idUser;
    
 
      // Now check which roleTab row to keep
    for(var j=0;j<ORole.length;j++){
      var {charRole, strRole}=ORole[j];
      var roleTab=charRole=='c'?customerTab:sellerTab;
      var strQMark=array_fill(nU,'?').join(', ');
      var sql="SELECT idUser, coordinatePrecisionM, tCreated, histActive, tAccumulated FROM "+roleTab+" WHERE idUser IN("+strQMark+");";
      var [err, resultsR]=yield* mysqlQuery(flow, con, sql, ValU); if(err) return [err];
      var nR=resultsR.length;
      if(nR==1) {
        var rowT=resultsR[0];
        if(idUserUBest!=rowT.idUser) {
          var sql="UPDATE "+roleTab+" SET idUser=? WHERE idUser=?;";  var Val=[idUserUBest, rowT.idUser];
          var [err, results]=yield* mysqlQuery(flow, con, sql, Val); if(err) return [err];
          var c=results.affectedRows; StrMes.push(c+" rows from "+strRole+"Tab changed idUser.");
        }
      } else if(nR>1) {
          // Select one roleTab-row, delete the others, update the selected row, change the rows idUser to idUserUBest
        var coordinatePrecisionM=0, tCreated=Infinity, tAccumulated=0, iBest=0, Val=[];
        for(var i=0;i<nR;i++){
          var rowT=resultsR[i];
          if(rowT.coordinatePrecisionM>coordinatePrecisionM) coordinatePrecisionM=rowT.coordinatePrecisionM;
          if(rowT.tCreated<tCreated) {tCreated=rowT.tCreated;}
          if(rowT.tAccumulated>tAccumulated) {tAccumulated=rowT.tAccumulated; iBest=i;}
          Val.push(resultsR[i].idUser);
        }
        var rowBest=resultsR[iBest];
        var idUserVBest=rowBest.idUser
        Val.splice(iBest,1);
        
        var strQMark=array_fill(nR-1,'?').join(', ');
        var sql="DELETE FROM "+roleTab+" WHERE idUser IN("+strQMark+");";
        var [err, results]=yield* mysqlQuery(flow, con, sql, Val); if(err) return [err];
        var c=results.affectedRows; StrMes.push(c+" rows from "+strRole+"Tab deleted.");
        
        var sql="UPDATE "+roleTab+" SET idUser=?, tCreated=?, coordinatePrecisionM=? WHERE idUser=?;";
        var Val=[idUserUBest, tCreated, coordinatePrecisionM, idUserVBest];
        var [err, results]=yield* mysqlQuery(flow, con, sql, Val); if(err) return [err];
        var c=results.affectedRows; StrMes.push(c+" rows from "+strRole+"Tab updated.");
      }
    }
      
      // Delete multiple key combos in the complaintTab.
    var sql=`
      -- Create a table tmpA with only the involved idMerge's
    DROP TABLE IF EXISTS tmpA;
    CREATE TEMPORARY TABLE tmpA ( idMerge int(4) NOT NULL, idAlt int(4) NOT NULL ) ENGINE=INNODB;
    INSERT INTO tmpA SELECT $strColToMerge, $strColAlt FROM $strTab WHERE $strColToMerge IN($strToMergeAll);


      -- Create a table tmpB with the idAlts that have multiple entries in tmpA
    DROP TABLE IF EXISTS tmpB;
    CREATE TEMPORARY TABLE tmpB ( idAlt int(4) NOT NULL ) ENGINE=INNODB;
    INSERT INTO tmpB SELECT idAlt
        FROM 
        (SELECT idAlt, COUNT(*) AS Counter 
         FROM tmpA 
         GROUP BY idAlt) AS tbl WHERE Counter>1;

    DELETE t FROM $strTab t JOIN tmpB tB ON t.$strColAlt=tB.idAlt WHERE $strColToMerge IN ($strToMergeObs);`;
      
    var ValUObs=ValU.concat();  ValUObs.splice(iBestU,1);
    var sql=myParser(sql, {strTab:complaintTab, strColToMerge:'idComplainer', strColAlt:'idComplainee', strToMergeAll:ValU.join(','), strToMergeObs:ValUObs.join(',')});
    var [err, results]=yield* mysqlQuery(flow, con, sql, ValU); if(err) return [err];
    var sql=myParser(sql, {strTab:complaintTab, strColToMerge:'idComplainee', strColAlt:'idComplainer', strToMergeAll:ValU.join(','), strToMergeObs:ValUObs.join(',')});
    var [err, results]=yield* mysqlQuery(flow, con, sql, ValU); if(err) return [err];
      
      // Update nComplaint and nComplaintGiven
    var Sql=[];
    Sql.push('SELECT @n:=COUNT(*) FROM '+complaintTab+' WHERE idComplainee=?;');
    Sql.push('SELECT @nW:=COUNT(*) FROM '+complaintTab+' WHERE idComplainer=?;');
    Sql.push('UPDATE '+userTab+' SET nComplaint=@n, nComplaintGiven=@nW WHERE idUser=?;');
    var sql=Sql.join('\n'), Val=[idUserUBest, idUserUBest, idUserUBest];
    var [err, results]=yield* mysqlQuery(flow, con, sql, Val); if(err) return [err];
    
      
      // As there are multiple user-rows, then delete the surplus ones and update the one to keep.
    ValUObs.splice(iBestU,1);
    var strQMark=array_fill(ValUObs.length,'?').join(', ');
    var sql="DELETE FROM "+userTab+" WHERE idUser IN("+strQMark+");";
    var [err, results]=yield* mysqlQuery(flow, con, sql, ValUObs); if(err) return [err];
    var c=results.affectedRows; StrMes.push(c+" rows from userTab deleted.");
    
    var sql="UPDATE "+userTab+" SET idFB=?, idIdPlace=?, idOpenId=?, email=?, nameIP=?, image=?, donatedAmount=?, nComplaintCum=?, nComplaintGivenCum=? WHERE idUser=?;"; // , nComplaint=?, nComplaintGiven=?
    var Val=[idFB, idIdPlace, idOpenId, email, nameIP, image, donatedAmount, nComplaintCum, nComplaintGivenCum, idUserUBest];  // , nComplaint, nComplaintGiven
    var [err, results]=yield* mysqlQuery(flow, con, sql, Val); if(err) return [err];
    var c=results.affectedRows; StrMes.push(c+" rows from userTab updated.");
    Ou.idUser=idUserUBest;
  }
  return [null,Ou];
}


