// styles.js
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

export const SearchBarContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #dee2e6;
`;

export const RandomBreedButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;

  button {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    margin-bottom: 1rem;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export const RandomBreedImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: contain;
  border-radius: 4px;
`;


export const CaughtBreedsContainer = styled.div`
  margin-bottom: 1rem;
`;

export const Title = styled.h3`
  margin-bottom: 0.5rem;
`;

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  margin-bottom: 0.5rem;
`;

export const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

export const ClearAllButtonContainer = styled.button`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

export const SearchResults = styled.ul`
  list-style-type: none;
  padding: 0;
  background-color: white;
  border: 1px solid #dee2e6;
  max-height: 200px;
  overflow-y: auto;
  position: absolute;
  width: 100%;
  z-index: 1;
`;

export const SearchResult = styled.li`
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #f8f9fa;
  }
`;

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

export const BreedItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
`;

export const BreedImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

export const BreedName = styled.h4`
  margin-bottom: 1rem;
`;

export const LogoutButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

export const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

export const EmptyMessage = styled.p`
  text-align: center;
`;
