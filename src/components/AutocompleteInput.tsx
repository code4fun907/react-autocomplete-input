import { useEffect, useRef, useState } from "react";

export interface IAutocompleteInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  words: string[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const isStringSimilar = (s1: string, s2: string): boolean => {
  let similarCharCount = 0;
  let s2IndexesUsed: number[] = [];

  for (let i = 0; i < s1.length; ++i) {
    for (let j = 0; j < s2.length; j++) {
      if (!s2IndexesUsed.includes(j)) {
        if (s1[i].toLocaleLowerCase() == s2[j].toLowerCase()) {
          similarCharCount += 1;
          s2IndexesUsed.push(j);
        }
      }
    }
  }

  return similarCharCount >= 3;
};

const generateAutocompleteSelections = (
  value: string,
  words: string[]
): string[] => {
  const selections: string[] = [];
  for (const word of words) {
    if (isStringSimilar(value, word)) {
      selections.push(word);
    }
  }

  return selections;
};

export const AutocompleteInput: React.FC<IAutocompleteInputProps> = (props) => {
  const [selections, setSelections] = useState<string[]>();
  const [selectionBoxOpen, setSelectionBoxOpen] = useState<boolean>(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setSelections(generateAutocompleteSelections(props.value, props.words));

    setSelectionBoxOpen(!props.words.includes(props.value));
  }, [props.value, props.words]);

  return (
    <div className="flex flex-col">
      <input
        {...props}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        autoComplete="off"
        ref={inputRef}
      />
      <div>
        {(selections?.length &&
          selectionBoxOpen &&
          document.activeElement === inputRef.current && (
            <div className="bg-slate-100 p-1 absolute rounded-md mt-1">
              {selections.map((selection) => (
                <div
                  key={selection}
                  className="hover:bg-slate-50 cursor-pointer p-1"
                  onClick={() => props.setValue(selection)}
                >
                  {selection}
                </div>
              ))}
            </div>
          )) ||
          null}
      </div>
    </div>
  );
};
