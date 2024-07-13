import type { JSX } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import type { Pokemon } from '../../api/request.schema';
import { CloseButton } from '../details-section/close-button';

export function DetailsCard(pokemonInfo?: Pokemon): JSX.Element {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  if (!pokemonInfo) {
    return <p>no info provided</p>;
  }

  const query = searchParams.size === 0 ? '' : `?${searchParams.toString()}`;
  const { name, hp, types, attacks } = pokemonInfo;

  return (
    <>
      <NavLink
        to={`/${query}`}
        className="absolute inset-0 z-10 cursor-default"
      />
      <div className="h-dvh relative flex w-full p-10 flex-col z-20">
        <CloseButton
          onClick={() => {
            navigate(`/${query}`);
          }}
        />
        <h3>{name}</h3>
        {hp ? <p>{`HP: ${hp}`}</p> : 'No Hp specified'}
        <div>
          <h4>Types</h4>
          {types ? (
            <ul>
              {types.map((type) => (
                <li key={type}>{type}</li>
              ))}
            </ul>
          ) : (
            'No types specified'
          )}
          <h4>Attacks</h4>
          {attacks ? (
            <ul>
              {attacks.map((attack) => (
                <li key={attack.name}>
                  <p>{attack.name}</p>
                  <p>{`Damage: ${attack.damage}`}</p>
                  <p>{`Description: ${attack.text}`}</p>
                </li>
              ))}
            </ul>
          ) : (
            'No attacks specified'
          )}
        </div>
      </div>
    </>
  );
}
