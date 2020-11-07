import React from 'react';
import Anglebracketremover from './Anglebracketremover';

const BracketSeparator = ({content}) => {
    var content_updated = [];
    content.map( (singleLine) => {  
 
        if(singleLine.startsWith("(") && singleLine.endsWith(")")){  // handles (anything)
                
                var index;
                var index2;
                for(var x = 0;x < singleLine.length;x++){
                    if(singleLine.charAt(x) === "("){
                          index = singleLine.indexOf(singleLine.charAt(x));
                               content_updated.push("(");
                      }
                    if(singleLine.charAt(x) === ")"){
                        index2 = singleLine.indexOf(singleLine.charAt(x));
                    }  
                }
                content_updated.push(singleLine.slice(index + 1,index2));
                for(var t = 0;t < singleLine.length;t++){
                    if(singleLine.charAt(t) === ")"){
                               content_updated.push(")");
                      }
                }

        }
        else if(singleLine.includes("(") && singleLine.endsWith(")")){   // handles anything()
            if(singleLine.indexOf(")") === singleLine.indexOf("(") + 1){  //specifies it is anything() rather than anything(anything)
                var index3 = singleLine.indexOf("(");
                content_updated.push(singleLine.slice(0,index3));
                for(var y = 0;y < singleLine.length;y++){
                    if(singleLine.charAt(y) === "("){
                        content_updated.push("(");
                    }
                }
                for(var a = 0;a < singleLine.length;a++){
                    if(singleLine.charAt(a) === ")"){
                        content_updated.push(")");
                    }     
                }
            }
            else{  
                var index8 = singleLine.indexOf("(");
                var index9 = singleLine.indexOf(")");
                content_updated.push(singleLine.slice(0,index8));
                for(var b = 0;b < singleLine.length;b++){
                    if(singleLine.charAt(b) === "("){
                        content_updated.push("(");
                        index8++;
                    }
                }
                content_updated.push(singleLine.slice(index8,index9));
                for(var c = 0;c < singleLine.length;c++){
                    if(singleLine.charAt(c) === ")"){
                        content_updated.push(")");
                    }     
                }
            }
           
        }
        else if(singleLine.startsWith("(") && !singleLine.includes(")") ){  //handles (anything
            var index4 = 0;
            for(var z = 0;z < singleLine.length;z++){
                if(singleLine.charAt(z) === "("){
                        content_updated.push("(");
                        index4++;
                  }
            }
             content_updated.push(singleLine.slice(index4));

        }  
        else if(!singleLine.includes("(") && singleLine.endsWith(")")){     //handles anything)
            var index5;
            index5 = singleLine.indexOf(")")
            content_updated.push(singleLine.slice( 0, index5));
            for(var q = 0;q < singleLine.length;q++){
                if(singleLine.charAt(q) === ")"){
                           content_updated.push(")");
                  }
            }
        }
        else if( singleLine.includes("(") && !singleLine.includes(")")){// handles anything(
            var index6 = singleLine.indexOf("(");
            content_updated.push(singleLine.slice(0,index6));
            var trueLength = index6 + (singleLine.length - (index6));

            var index7 = index6;
            for(var p = index6;p < trueLength;p++){
                if(singleLine.charAt(p) === "("){
                        content_updated.push("(");
                        index7++;
                  }
            }
            content_updated.push(singleLine.slice(index7));

            

        }
        else{
            content_updated.push(singleLine);
        }
        return null;
    })

    return (
        <div>
            <Anglebracketremover content = {content_updated}/>
        </div>    
    );
}

export default BracketSeparator;