import SearchActivity from "./SearchActivity"
import CarrouselCategorie from "./CarrouselCategorie"
import CardCategorie from "./CardCategorie"
import MemoryActivity from "./MemoryActivity"

function Home(){
    return(
        <>
            <SearchActivity />
            <CarrouselCategorie />
            <CardCategorie />
            <MemoryActivity />
        </>
    )
}

export default Home;