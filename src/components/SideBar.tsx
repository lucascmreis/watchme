import {useState, useEffect} from 'react'
import '../styles/sidebar.scss';
import {Button} from './Button'

import {api} from '../services/api'

interface GenreResponseProps{
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface ButtonProps {
  genreId: number;
  onClickButton: (id:number) => void;
}

export function SideBar(props : ButtonProps) {
 
  const [genres, setGenres] = useState<GenreResponseProps[]>([])
  


  useEffect(()=> {
    api.get('genres').then(response => {
      setGenres(response.data)
    })
  }, [])
  

  return(
    <>
      <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => props.onClickButton(genre.id)}
              selected={props.genreId === genre.id}
            />
          ))}
        </div>

      </nav>
    </>
  )
} 