import BreedItem from './BreedItem';
import { CaughtBreedsContainer, Title, List, EmptyMessage } from './styles';
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";


const showErrorToast = (message) => {
    toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

function CaughtBreeds({ loggedIn }) {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    let caughtBreeds;

    if (loggedIn) {
        axios
            .get('http://localhost:8080/dogcards')
            .then((response) => {
                caughtBreeds = response.data
            })
            .catch((error) => {
                console.error('Error fetching dog cards:', error);
                showErrorToast('Error fetching dog cards:', error);
            });
    }


    return (
        <CaughtBreedsContainer>
            <ToastContainer />
            <Title>Caught Breeds</Title>
            {caughtBreeds.length === 0 ? (
                <EmptyMessage>There are currently no breeds caught. Search above to catch some!</EmptyMessage>
            ) : (
                <List>
                    {caughtBreeds.map((breed, index) => (
                        <BreedItem key={index} breed={breed} index={index} />
                    ))}
                </List>
            )}
        </CaughtBreedsContainer>
    );
}

export default CaughtBreeds;