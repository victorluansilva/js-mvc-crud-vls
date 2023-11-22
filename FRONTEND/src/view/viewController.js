import { formNewUser } from "./form-new-user.js";
import { resultView } from "./result-view.js";

const viewController = {
    build:()=>{
        formNewUser.build();
        resultView.build();
    },

    update:(userArray, userToUpdate)=>{        
        resultView.update(userArray);
        formNewUser.update(userToUpdate);
        console.log(userArray, userToUpdate);
    },

    updateForm:(userToUpdate)=>{ 
        formNewUser.update(userToUpdate);
    }
}

export {viewController}