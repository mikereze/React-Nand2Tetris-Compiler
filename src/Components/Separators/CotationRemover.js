import React from 'react';
import SemicolonRemover from './SemicolonRemover';

const CotationRemover = ({content}) => {
    const regex_cotation = /[""'']/;
    const content_cotationremoved = [];


    content.map( (singleLine) => {
        if(regex_cotation.test(singleLine)){
            var index = 0;
           if(!singleLine.startsWith('"') || !singleLine.startsWith("'") ){   // checks if it includes cortation
               if(singleLine.includes("'")){
                   index = singleLine.indexOf("'");
               }
               else if(singleLine.includes('"')){
                   index = singleLine.indexOf('"')
               }
           }
           var first_phrase = singleLine.slice(0,index)
           if(first_phrase.includes(" ")){                  // separates the phrase before cotation with the spaces
                var each_singleLine = first_phrase.split(" ");
                var length_of_singleLine = first_phrase.split(" ").length;
                for(var x = 0;x < length_of_singleLine; x++){
                    if(each_singleLine[x] !== ""){
                        content_cotationremoved.push(each_singleLine[x]);

                    }
                }
           }
           var index2;
           if(singleLine.includes("'")){
                index2 = singleLine.indexOf("'",index+1);
           }
           else if(singleLine.includes('"')){
                index2 = singleLine.indexOf('"',index+1)
            }
            content_cotationremoved.push(singleLine.slice(index,index2+1));  //Content within cotation
            var second_phrase = singleLine.slice(index2+1);           //separates phrase after the cotation with space.
            if(second_phrase.includes(" ")){
                var each_singleLine_2 = second_phrase.split(" ");
                var length_of_singleLine_2 = second_phrase.split(" ").length;
                for(var y = 0;y < length_of_singleLine_2; y++){
                    if(each_singleLine_2[y] !== ""){
                        content_cotationremoved.push(each_singleLine_2[y]);

                    }
                }
           }
           else{
               content_cotationremoved.push(second_phrase);
           }


        }
        else{
            content_cotationremoved.push(singleLine);
        }
        return null;  
    })

    return (
        <div>
             <SemicolonRemover content = {content_cotationremoved} />
        </div>
    );
}

export default CotationRemover;