import SearchActivity from "./SearchActivity";
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