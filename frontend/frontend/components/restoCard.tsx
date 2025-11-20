import { Resto } from "../types/resto"; 
interface RestoCardProps {
    resto: Resto;
    onClick: () => void;

}

const RestoCard: React.FC<RestoCardProps> = ({ resto, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="w-full max-w-md p-5 bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-shadow font-mono-roboto border-solid border-1 border-zinc-300 "
        >
            <h2 className="text-xl font-semibold text-zinc-500 mb-4">{resto.name}</h2>
            <p className="text-zinc-400">Location: {resto.location}</p>
            <p className="text-zinc-400">Cuisine: {resto.cuisine}</p>
            <p className="text-zinc-400">Rating: {resto.rating}</p>
        </div>
    );
};

export default RestoCard;