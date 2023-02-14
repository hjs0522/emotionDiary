import {useParams} from 'react-router-dom';

function Diary (){
    const {id} = useParams();
    console.log(id);
    return(
        <div>
            D
        </div>
    );
}

export default Diary;