import { useState } from 'react';

type TagsInputProps = {
  value: string[];
  onChange: (tags: string[]) => void;
};

export const TagsInput = ({ value, onChange }: TagsInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (['Enter', 'Tab', ','].includes(e.key)) {
      e.preventDefault();
      const newTag = inputValue.trim();
      
      if (newTag && !value.includes(newTag)) {
        const newTags = [...value, newTag];
        onChange(newTags);
        setInputValue('');
      }
    }
  };

  const removeTag = (index: number) => {
    const newTags = value.filter((_, i) => i !== index);
    onChange(newTags);
  };

  return (
    <div className="w-full p-[0.5rem] border-[1px] border-[#ccc] rounded-[4px]">

      <div className="tags-list">
        <div className='w-full flex flex-wrap items-center gap-3'>
            {value.map((tag, index) => (
            <div key={index} className="tag-item">
                <span>{tag}</span>
                <button type="button" onClick={() => removeTag(index)}>&times;</button>
            </div>
            ))}
        </div>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add tags..."
          className="tags-input"
        />
      </div>

    </div>
  );
};