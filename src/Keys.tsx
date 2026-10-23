import { IItem } from './index';
import { useState } from 'react';

interface IItemProps {
    item: IItem;
    onSave: (id: number, name: string) => void;
}

function Item({ item, onSave }: IItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(item.name);

    if (!isEditing) {
        return (
            <div
                style={{ cursor: 'pointer', padding: '4px 0' }}
                onClick={() => {
                    setValue(item.name);
                    setIsEditing(true);
                }}
            >
                {item.name}
            </div>
        );
    }

    return (
        <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    onSave(item.id, value);
                    setIsEditing(false);
                } else if (e.key === 'Escape') {
                    setValue(item.name);
                    setIsEditing(false);
                }
            }}
        />
    );
}

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [items, setItems] = useState<IItem[]>(props.initialData);

    const sortedItems = [...items].sort((a, b) =>
        props.sorting === 'ASC' ? a.id - b.id : b.id - a.id,
    );

    const handleSave = (id: number, name: string) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, name } : item)),
        );
    };

    return (
        <div>
            {sortedItems.map((item) => (
                <Item key={item.id} item={item} onSave={handleSave} />
            ))}
        </div>
    );
}
