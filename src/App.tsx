import { useState } from "react";
import { AutocompleteInput } from "./components/AutocompleteInput";

export const App = () => {
  const [value, setValue] = useState<string>("");
  const [wordsToComplete, setWordsToComplete] = useState<string[]>([]);
  const [newWord, setNewWord] = useState<string>("");

  const handleAddNewWord = (e: any) => {
    e.preventDefault();
    if (wordsToComplete.includes(newWord)) {
      setNewWord("");
      return;
    }

    setWordsToComplete((prev) => [...prev, newWord]);
    setNewWord("");
  };

  const handleRemoveWord = (word: string) => {
    setWordsToComplete((prev) => prev.filter((w) => w !== word));
  };

  return (
    <div className="max-w-lg m-auto mt-10 flex flex-col gap-8 bg-slate-50 p-12 rounded-md shadow-2xl">
      <section>
        <h1 className="font-bold text-lg mb-2">React Autocomplete Input</h1>
        <p className="text-slate-600">
          This is a small project demonstrating a autocompletion input
          component. Add words to the list then type in the `Try it out` box in
          order to see the autocomplete at play
        </p>
      </section>
      <section>
        <form className="flex flex-col gap-1" onSubmit={handleAddNewWord}>
          <label htmlFor="newWordInput">Add a autocomplete word</label>
          <div className="flex gap-2">
            <input
              type="text"
              autoComplete="off"
              name="newWordInput"
              className="p-1 border rounded-md w-full"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
            />
            <button
              type="submit"
              className="bg-indigo-200 py-1 px-4 rounded-md hover:bg-indigo-400"
            >
              add
            </button>
          </div>
        </form>

        <div className="mt-2">
          <p className="text-slate-500 text-sm">
            Now autocompleting these words
          </p>
          <div className="rounded-md p-2 flex flex-col gap-2 border border-slate-300">
            {(wordsToComplete?.length &&
              wordsToComplete.map((word) => (
                <div className="flex justify-between items-center bg-slate-100 p-2 rounded-md">
                  <p className="ml-2">{word}</p>
                  <button
                    className="bg-red-400 p-2 text-white rounded-md"
                    onClick={() => handleRemoveWord(word)}
                  >
                    remove
                  </button>
                </div>
              ))) || (
              <p className="text-slate-400 text-sm">
                Not completing any words yet. Add words to the autocomplete
                list...
              </p>
            )}
          </div>
        </div>
      </section>

      <hr />

      <section>
        <form className="flex flex-col gap-1 mb-20">
          <label htmlFor="autocompleteInput">Try it out</label>
          <AutocompleteInput
            type="text"
            name="autocompleteInput"
            className="p-1 border rounded-md w-full"
            words={wordsToComplete}
            value={value}
            setValue={setValue}
          />
        </form>
      </section>
    </div>
  );
};
