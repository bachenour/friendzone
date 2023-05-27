import '../styles/MemoryActivity.css'
import cinemaMemory from '../assets/cinemaMemory.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const listMemoryCard = [
    {
        categorie: 'Jeux de tir', src:{cinemaMemory}, auteur: "Lily"
    },
    {
        categorie: 'Jeux de tir', src:{cinemaMemory}, auteur: "Lily"
    },
    {
        categorie: 'Jeux de tir', src:{cinemaMemory}, auteur: "Lily"
    },
    {
        categorie: 'Jeux de tir', src:{cinemaMemory}, auteur: "Lily"
    },
    {
        categorie: 'Jeux de tir', src:{cinemaMemory}, auteur: "Lily"
    },
    {
        categorie: 'Jeux de tir', src:{cinemaMemory}, auteur: "Lily"
    },
    {
        categorie: 'Jeux de tir', src:{cinemaMemory}, auteur: "Lily"
    },
    {
        categorie: 'Jeux de tir', src:{cinemaMemory}, auteur: "Lily"
    },
    {
        categorie: 'Jeux de tir', src:{cinemaMemory}, auteur: "Lily"
    },
]

function MemoryActivity() {
    return (
        <>
            <ul className='cardsMemory'>
            {listMemoryCard.map((element, i) => {
                    return (
                        <>
                            <li key={i}>
                                <div className='cardMemory'>
                                        <img className='card_memory_image' src={cinemaMemory}></img>
                                    <div className='cardTxt'>
                                        <p>Hello World</p>
                                    </div>
                                </div>
                            </li>
                        </>
                    )
                })}
            </ul>
            <div className='circleButton'>
                <a href='#' className='iconCircleButton'><KeyboardArrowDownIcon></KeyboardArrowDownIcon></a>
            </div>
            <div className='memoryBanner'>
                <p>avis</p>
            </div>
        </>
    )
}

export default MemoryActivity