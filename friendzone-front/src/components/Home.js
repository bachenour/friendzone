import SearchActivity from "./SearchActivity"
import CarrouselCategorie from "./CarrouselCategorie"
import CardCategorie from "./CardCategorie"
import MemoryActivity from "./MemoryActivity"
import PopUpActivity from "./PopUpActivity"

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