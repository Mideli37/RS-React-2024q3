import { useEffect, useState, type JSX } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemonById } from '../../api/api';
import type { PokemonByIdResponse } from '../../api/request.schema';
import { DetailsCard } from '../details-card';
import { Loader } from '../loader';

export function DetailsSection(): JSX.Element {
  const [isPending, setIsPending] = useState(true);
  const [info, setInfo] = useState<PokemonByIdResponse | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      throw new Error('no id provided');
    }
    setIsPending(true);
    void getPokemonById(id).then((data) => {
      setInfo(data);
      setIsPending(false);
    });
  }, [id]);

  return (
    <div className="w-1/3 h-dvh flex flex-col justify-center  bg-teal-50 items-center">
      {isPending ? <Loader /> : info && <DetailsCard {...info.data} />}
    </div>
  );
}


