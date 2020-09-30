module.exports = class command{

	// check if message match with commands requirements
	// do action if match
    static parse(message){
        if(this.match(message)){
            this.action(message)
            return true;
        }
        return false;
    }

    // check if message match
    static match(message){
        return false;
    }
    
    // action
    static action(message){
        return;
    }
}