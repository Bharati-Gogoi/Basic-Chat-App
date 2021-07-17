import firebase from 'firebase/app'
import 'firebase/firestore'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export default function DeleteData({docu}){
    const db=firebase.firestore()

    function deleteDoc(){
        let conf = window.confirm("Are you sure?")
        if(conf){
            db.collection('messages')
            .doc(docu).delete().then(function () {
                console.log("Document successfully deleted!");
            })
            .catch(function (error) {
                console.error("Error removing document: ", error);
            });
        }
    }
    
    return (
        <div>
            <DeleteForeverIcon color="secondary"
            onClick={deleteDoc}/>
        </div>
    )
}