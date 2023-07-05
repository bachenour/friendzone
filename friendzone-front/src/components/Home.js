import SearchActivity from "./SearchActivity";
import MemoryActivity from "./MemoryActivity"
import PopUpActivity from "./PopUpActivity"
import CardCategorie from "./CardCategorie";
import CarrouselCategorie from "./CarrouselCategorie";

function Home(){
    return(
        <>
            <PopUpActivity />
            <SearchActivity />
            <CarrouselCategorie />
            <CardCategorie />
            <MemoryActivity />
        </>
    )
}

export default Home;