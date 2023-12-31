import { useParams } from 'react-router-dom';
import styled  from 'styled-components';
import {AlternateEmail} from 'styled-icons/material';
import { Send } from '@styled-icons/bootstrap/Send'

export const Container = styled.div`
    grid-area: CD;
    display:flex;
    flex-direction: column;
    align-items: left;
    justify-content: end;
    background-color: var(--primary);
`;

export const Messages = styled.div`
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 46px - 68px) ;
    overflow-y: scroll;

    &::-webkit-scrollbar{
        width:4px;   
    }
    
    &::-webkit-scrollbar-trumb{
        background-color: var(--tertiary);
        border-radius: 4px;
    }
    
    &::-webkit-scrollbar-track{
        background-color: var(--secondary);
    }
`;
export const InputWrapper = styled.div`
    width:100%;
    padding: 0 16px;
`;
export const Input = styled.input`
    width:100%; 
    height: 44px;
    padding: 0 10px 0 57px;
    border-radius:7px;
    color: var(--white);
    background-color: var(--chat-input);
    position:relative;

    &&::placeholder{
        color: var(--gray);
    }

    ~svg{
        position: relative;
        top:-50%;
        
        transition: 1.8s ease-in-out;
    }
`;
export const InputIcon = styled(AlternateEmail)`
    width:24px;
    height:24px;
    left: 14px;
    color:var(--gray);
`;  
export const SendIcon = styled(Send)`
    width:24px;
    height:24px;
    float:right;
    color:var(--gray);
    cursor:pointer;
`; 