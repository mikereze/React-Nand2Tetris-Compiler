import React  from 'react';
import ConvertToFile from './ConvertToFile';

const CompilationEngine = ({content}) => {

    var content_separated = [];
    var compiled_content = [];
    var current_token;
    var original_content;
    var index;
    const KeywordConstant = ['true','false','null','this'];
    const unaryOp = ['-','~'];
    const op = ['+','-','*','/','&amp;','|','&lt;','&gt;','='];

    var contents_array = [];
    var each_orignal_content = [];
    var temp_content_1 = [];
        for(var y=0;y<content.length;y++){                // divides the files 
           if(content[y].length >= 1){
                if(content[y] !== "Result"){
              
                        temp_content_1.push(content[y])

                }
                else if(content[y] === "Result"){
                    contents_array.push(temp_content_1);
                    temp_content_1 = [];
                }
           }
            
    }


    content.map( (singleLine) => {
        if(singleLine.includes(">")){
            var index1 = singleLine.indexOf(">");
            var index2 = singleLine.indexOf("</");
            return content_separated.push(singleLine.slice(index1+1,index2));
        }
        else {
            return content_separated.push(singleLine);
        }
       
    })

   
    var each_contents = []
    var temp_content = [];
        for(var z=0;z<content_separated.length;z++){                // divides the files 
           if(content_separated[z].length >= 1){
                if(content_separated[z] !== "Result"){
                    temp_content.push(content_separated[z])
                }
                else if(content_separated[z] === "Result"){
                    each_contents.push(temp_content);
                    temp_content = [];
                }
           }
            
    }


    


    const advance = () => {
        if(current_token === null){
            current_token = original_content[index];
        }
        else {
            index++;
            current_token = original_content[index];

        }
    }

    const eat = (token) => {
        if(current_token !== token){
            return false;
        }
        else {
           var index_token = original_content.indexOf(token,index);
           compiled_content.push(each_orignal_content[index_token]);
           advance();
           return true;
        }
    }

    const handleIdentifiers = () => {
        var index_of_identifier = original_content.indexOf(current_token,index);
        if(each_orignal_content[index_of_identifier].includes("<identifier>")){
            compiled_content.push(each_orignal_content[index_of_identifier]);
            advance();
        }
    }
    const handleType = () => {

        if(!eat('int') && !eat('char')){
            eat('boolean');
        }
        else if(!eat('char') && !eat('boolean') ){
            eat('int');
        }
        else if(!eat('int') &&   !eat('boolean')){
            eat('char');
        }
        else{
            handleIdentifiers();
        }
    }

    const handlesubroutineCall = () => {
        var index_of_subroutine = original_content.indexOf(current_token);
        if(original_content[index_of_subroutine + 1] === "("){
            handleIdentifiers();
            eat('(');
            handleExpressionList();
            eat(')');
        }
        else{
            handleIdentifiers();
            eat('.');
            handleIdentifiers();
            eat('(');
            handleExpressionList();
            eat(')');
        }
       
    }

    const handleExpressionList = () => {
        compiled_content.push("<expressionList>")

        if(current_token !== ")"){
            compileExpression();
            while(current_token === ","){
                eat(",");
                compileExpression();
            }   
        }
        compiled_content.push("</expressionList>")

    }

    const handleTerm = () => {
        var index_of_identifier = original_content.indexOf(current_token,index)
                compiled_content.push(each_orignal_content[index_of_identifier]);
                advance();
    }

    const handlesubroutineBody = () => {
        compiled_content.push("<subroutineBody>")

        eat('{');
        while(current_token.includes('var')){
            compileVarDec();
        }
        compileStatements();
        eat('}')
        compiled_content.push("</subroutineBody>")


    }

    const compileClassVarDec = () => {
        compiled_content.push("<classVarDec>")
        if(!eat('static')){
            eat('field');
        }
        else{
            eat('static')
        }
        handleType();
        handleIdentifiers();    
        while(current_token !== ";" ){   //handles (',' varName)*
            eat(',');
            handleIdentifiers(); 
        }
        
        eat(';');
        compiled_content.push("</classVarDec>")
    }


    const compileParameterList = () => {
        compiled_content.push("<parameterList>")

        while(current_token !== ")"){
            handleType();
            handleIdentifiers();
            while(current_token.includes(',')){
                eat(',');
                handleIdentifiers();
            }
        }
        compiled_content.push("</parameterList>")

    }

    const compileSubroutine = () => {
        compiled_content.push("<subroutineDec>")

        if(eat('method')){

            eat('method');
        }
        else if( eat('function')){

            eat('function');
        }
        else if( eat('constructor')){

            eat('constructor');
        }
        if(eat('void')){  //handles (void || type)

            eat('void');
        }
        else {

            handleType();
        }


       while(current_token !== "("){
           handleIdentifiers();
       }
        eat('(');
        compileParameterList();
        eat(')');
        handlesubroutineBody();       //handles subroutineBody
        compiled_content.push("</subroutineDec>")

    }

    const compileClass = () => {
        compiled_content.push("<class>");
        eat('class');
         handleIdentifiers();
        eat('{');
        while(current_token !== 'constructor' && current_token !== 'function' && current_token !== 'method'){
          compileClassVarDec();
        }
        while(index + 1 !== original_content.length){
            compileSubroutine();
        }
        eat('}');
        compiled_content.push("</class>");

    }

    const compileVarDec = () => {
        compiled_content.push("<varDec>")

        eat('var');  //handles var
        handleType(); //handle type
        handleIdentifiers();   //handles varName
        while(current_token !== ";" ){   //handles (',' varName)*
            eat(',');
            handleIdentifiers(); 
        }
        eat(';');     //handles ;
        compiled_content.push("</varDec>")

    }

    const compileDo = () => {
        compiled_content.push("<doStatement>");
        eat('do');
        handlesubroutineCall();
        eat(';')
        compiled_content.push("</doStatement>");
    }

    const compileLet = () => {
        compiled_content.push("<letStatement>");
        eat('let');
        handleIdentifiers();   //handles varName
        if(current_token !== "="){  //handles [expression]
            eat('[');
            compileExpression();
            eat(']');
        } 
        eat('=');
        compileExpression(); //handles expression
        eat(';');
        compiled_content.push("</letStatement>");


    }

    const compileWhile = () => {
        compiled_content.push("<whileStatement>");
        eat('while');
        eat("(");
        compileExpression();
        eat(")");
        eat("{");
        compileStatements();
        eat("}");
        compiled_content.push("</whileStatement>");


    }

    const compileReturn = () => {
        compiled_content.push("<returnStatement>")
        eat('return');
        if(current_token !== ";"){   //handles Expression?
            compileExpression();
        }
        eat(";");
        compiled_content.push("</returnStatement>");
    }

    const compileIf = () => {
        compiled_content.push("<ifStatement>");
        eat('if');
        eat("(");
        compileExpression();
        eat(")");
        eat("{");
        compileStatements();
        eat("}");
        if(current_token === "else"){      //handles the else statement ??
            eat('else');
            eat('{');
            compileStatements();
            eat('}');
        }
        
        compiled_content.push("</ifStatement>");

        
    }

    const compileStatements = () => {
        var ref_token;
        var statmentArray = ['let','if','while','do','return'];
        if(statmentArray.includes(current_token)){
            ref_token = current_token;
            compiled_content.push("<statements>");
        }
        while(statmentArray.includes(current_token)){
            if(current_token.includes('if') ){
                compileIf();
            }
            if(current_token.includes('let')){
                compileLet();
            }
            if(current_token.includes('while')){
                compileWhile();
            }
            if(current_token.includes('do')){
                compileDo();
            }
            if(current_token.includes('return')){
                compileReturn();
            }
        }
        if(statmentArray.includes(ref_token)){
            compiled_content.push("</statements>");
        }
    }

    const compileTerm = () => {
        const regex_integerConstant = /[0-9]/;
        var index_of_string;
        compiled_content.push("<term>");
        index_of_string = original_content.indexOf(current_token,index);

        if(each_orignal_content[index_of_string].includes("<stringConstant>")){      //handles stringConstant
            handleTerm();
            index_of_string++;
            
        }
        else if(KeywordConstant.includes(current_token)){     //handles KeywordConstant
            handleTerm();
            index_of_string++;
            
        }
        else if(regex_integerConstant.test(current_token)){          //handles integerConstant
            handleTerm();
            index_of_string++;
            
           
        }   
        else if(each_orignal_content[index_of_string].includes("<identifier>")){       // handles varName
            if(each_orignal_content[index_of_string+1].includes('[')){  //handles varName '['expression']'
           
                handleIdentifiers();     
                eat('[');
                compileExpression();
                eat(']');
                index_of_string = index_of_string + 4;
            }
            else if(each_orignal_content[index_of_string+1].includes('.') || each_orignal_content[index_of_string+1].includes('(')){
                handlesubroutineCall();    
                index_of_string++;  
            }

            else {
                handleIdentifiers();   
                index_of_string++;  
            }
               
        }
      
        else if(current_token.startsWith("(") ){     //handles (expression)
            eat('(');
            compileExpression();
            eat(')');
        }
        else if(unaryOp.includes(current_token)){    //handles unaryOp term

            if(eat('-')){
                eat('-');
              
            }
            else if(eat('~')){
                eat('~');
            }
            compileTerm();

        }

        compiled_content.push("</term>");

    }

   

    const compileExpression = () => {
        compiled_content.push("<expression>");
        compileTerm();                    //handles term
        
        while(op.includes(current_token)){   //handles (op term)*
                eat(current_token);
                compileTerm();
        }
       
        compiled_content.push("</expression>");

    }

    var tempindex = 0;
    each_contents.forEach((element) => {
        index = 0;
        
        each_orignal_content = contents_array[tempindex]
        original_content = element;
        current_token = element[0];
        compiled_content.push("********************************************************************");
        compiled_content.push("This is the "+element[0]+element[1]);
        compiled_content.push("********************************************************************");
        compileClass();
        tempindex++;

    })


  

    return (
        <div>
            
        <ConvertToFile content = {compiled_content} />    
        </div>
    );
}

export default CompilationEngine;