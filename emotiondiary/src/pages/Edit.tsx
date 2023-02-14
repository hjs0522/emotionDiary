import { useSearchParams } from "react-router-dom";

function Edit (){
    const [searchParmas, setSearchParams] = useSearchParams();
    const id = searchParmas.get("id");
    const mode = searchParmas.get("mode");
    return(
        <div>
            E
        </div>
    );
}

export default Edit;