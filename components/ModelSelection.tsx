'use client';
import useSWR from 'swr';
import Select from 'react-select';

const fetchModels = () => fetch('/api/getEngines').then((res) => res.json());

const ModelSelection = () => {
  const { data: models, isLoading } = useSWR('models', fetchModels);
  const { data: model, mutate: setModel } = useSWR('model', {
    fallbackData: 'text-davinci-003',
  });

  return (
    <div className="mt-2">
      <Select
        className="mt-2"
        classNames={{
          control: (_state) => 'bg-[#434654] border-[#434654]',
        }}
        defaultValue={model}
        isLoading={isLoading}
        isSearchable
        menuPosition="fixed"
        onChange={(e) => setModel(e.value)}
        options={models?.modelOptions}
        placeholder={model}
      />
    </div>
  );
};

export default ModelSelection;
