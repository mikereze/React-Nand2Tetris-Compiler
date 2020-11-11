

class SymbolTable {

    classTable = {};
    subRoutineTable = {};
    classIndex = {
        static : 0,
        field : 0,
        var : 0,
        ARG : 0
    }
    subRoutineIndex = {
        ARG : 0,
        var : 0
    }
    
    constructor(){
        this.classTable = {}
        this.classIndex = {
            static : 0,
            field : 0,
            var : 0,
            ARG : 0
        }
    }

    returnsObject = () =>{
        return console.log("This is the subroutine",this.subRoutineTable,"This is the class",this.classTable)
    }

    define = (name,type,kind,classOrSubroutine) => {

       if(classOrSubroutine === "class"){
            this.classTable[name] = {
                kind: [kind],
                type: [type],
                index: [this.VarCount(kind,classOrSubroutine,name)]
            }
          
        

       }    
       else{  
            if(classOrSubroutine === "subRoutine"){
                    this.subRoutineTable = {};
                    this.subRoutineIndex = {
                        ARG : 0,
                        var : 0
                    }
            }
            else{
                    this.subRoutineTable[name] = {
                        kind: [kind],
                        type: [type],
                        index: [this.VarCount(kind,classOrSubroutine,name)]
                    }
                }
         }
    }

    VarCount = (kind,classOrSubroutine,name) => {

       if(classOrSubroutine === "class"){
        const  tobeReturned = this.classIndex[kind];
        this.classIndex[kind]++;
        return tobeReturned

       }
       else{
        const  tobeReturned = this.subRoutineIndex[kind];
        this.subRoutineIndex[kind]++;
        return tobeReturned
       }


    }

    KindOf = (name) => {
       if(this.subRoutineTable[name]){
           let subroutineKind = this.subRoutineTable[name].kind[0];
           return subroutineKind;
       }
       else if(this.classTable[name]){
           let classtableKind = this.classTable[name].kind[0];
           return classtableKind;
       }

    }

    TypeOf = (name) => {
        if(this.subRoutineTable[name]){
            let subroutineType = this.subRoutineTable[name].type[0];
            return subroutineType;
        }
        else if(this.classTable[name]){
            let classtableType = this.classTable[name].type[0];
            return classtableType;
        }

    }

    IndexOf = (name) => {
        if(this.subRoutineTable[name]){
            let subroutineIndex = this.subRoutineTable[name].index[0];
            return subroutineIndex;
        }
        else if(this.classTable[name]){
            let classtableIndex = this.classTable[name].index[0];
            return classtableIndex;
        }

    }


}

export default SymbolTable;