import React from 'react';
import CompilationEngine from './CompilationEngine';

const Tokenizer = ({content}) => {


    var all_content_xml = [];   
    var all_content_array = [];
    var index = 0;
    var current_token;
    var keyword = ["class","constructor","function","method","field","static","var",
                    "int","char","boolean","void","true","false","null","this","let","do",
                    "if","else","while","return"];
    var symbol_arr = [ "{","}","(",")","[","]",".",",",";","+","-","*","/","&amp;","|","&gt;","&lt;","=","~"];
    const regex_int_const = /[0-9]/;
    const regex_string_const = /[A-Za-z_0-9]/;           
    
       
    var temp_content = [];
        for(var y=0;y<content.length;y++){                // divides the files 
           if(content[y].length >= 1){
                if(content[y] !== "Result"){
                    if(content[y]  === "<"){
                        temp_content.push("&lt;")
                    }
                    else if(content[y] === ">"){
                        temp_content.push("&gt;")
                    }
                    else if(content[y] === "&"){
                        temp_content.push("&amp;")
                    }
                    else{
                        temp_content.push(content[y])
                    }
                  
                }
                else if(content[y] === "Result"){
                    all_content_array.push(temp_content);
                    temp_content = [];
                }
           }
            
    }

    const hasMoreTokens = (element) => {         //checks if it has more tokens
        if(index !== element.length -1) {
            return true
        }
        else{
            return false
        }
    }

    const advance = (singleLine) => {          //checks for the next tokens
           
         if(hasMoreTokens){
            current_token =  singleLine;
            index++;
         }
    }

    const tokenType = () => {                         //check the token type
        if(keyword.includes(current_token)){
            keyWord(current_token);
            return "KEYWORD";
        }
        else if(symbol_arr.includes(current_token)){
            symbol(current_token);
            return "SYMBOL";
        }  
        else if(regex_int_const.test(current_token)){
            intVal(current_token);
            return "INT_CONST";
        }
        else if(current_token.includes('"') || current_token.includes("'")){
            var index_string;
            var new_current_token;
            if(current_token.includes("'")){
                index_string = current_token.indexOf("'",1);
            }
            else if(current_token.includes('"')){
                index_string = current_token.indexOf('"',1);

            }
            new_current_token = current_token.slice(1,index_string);
            stringVal(new_current_token);

            return "STRING_CONSTANT";
        }
        else if(regex_string_const.test(current_token)){
            identifier(current_token);
            return "IDENTIFIER"
        }
        
    }

    const keyWord = (current_token) => {                            //returns for the keyword type
        var tobeReturned = "<keyword>"+current_token+"</keyword>";
        all_content_xml.push(tobeReturned);
        return tobeReturned;
    }

    const symbol = (current_token) => {                            //returns for the symbol type
        var tobeReturned = "<symbol>"+current_token+"</symbol>";
        all_content_xml.push(tobeReturned);
        return tobeReturned;
    }

    const identifier = (current_token) => {                         //returns for the identifier type
        var tobeReturned = "<identifier>"+current_token+"</identifier>";
        all_content_xml.push(tobeReturned);
        return tobeReturned;
    }

    const intVal = (current_token) => {                             //returns for the intVal type
        var tobeReturned = "<integerConstant>"+current_token+"</integerConstant>";
        all_content_xml.push(tobeReturned);
        return tobeReturned;
    }

    const stringVal = (current_token) => {                         //returns for the stringVal type
        var tobeReturned = "<stringConstant>"+current_token+"</stringConstant>";
        all_content_xml.push(tobeReturned);
        return tobeReturned;
    }


    all_content_array.forEach(element => {
      
        // all_content_xml.push("********************************************************************************************************************************************");
        // all_content_xml.push("This is the "+element[0]+ " "+element[1]);
        // all_content_xml.push("********************************************************************************************************************************************");


        element.forEach( (singleLine) => {
            // if(singleLine === "<"){
            //     singleLine = "&lt;"
            // }
            // if(singleLine === ">"){
            //     singleLine = "&gt;"
            // }

            hasMoreTokens(element);
            advance(singleLine);
            tokenType();


        })
        all_content_xml.push("Result");
          
   });



    return (
        <div>
            <CompilationEngine content={all_content_xml} />
        </div>
    );
}

export default Tokenizer;