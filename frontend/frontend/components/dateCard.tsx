import { Date } from '../types/date';

interface DateCardProps {
    date: Date;
    onClick: () => void;
}

const DateCard: React.FC<DateCardProps> = ({ date, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="w-full max-w-md p-5 bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-shadow font-mono-roboto border-solid border-1 border-zinc-300 "
        >
            <h2 className="text-xl font-semibold text-zinc-500 mb-4">{date.name}</h2>
            <p className="text-zinc-400">Location: {date.location}</p>
        </div>
    );
};

export default DateCard;