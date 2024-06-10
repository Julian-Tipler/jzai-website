const CopilotForm = ({
  url,
  title,
  predefinedColors,
  selectedColor,
  customColor,
  copilotId,
  urlIsReadOnly,
  setUrl,
  setTitle,
  handleColorChange,
  handleCustomColorChange,
}: {
  url: string;
  title: string;
  predefinedColors: string[];
  selectedColor: string;
  customColor: string;
  copilotId: string | null;
  urlIsReadOnly?: boolean;
  setUrl: (url: string) => void;
  setTitle: (title: string) => void;
  handleColorChange: (color: string) => void;
  handleCustomColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <div className="mb-3">
        <label
          className="block text-gray-500 text-sm font-normal mb-2"
          htmlFor="url"
        >
          Your website URL
        </label>
        <input
          id="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://your-url-here.com"
          className={`w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${copilotId ? "bg-gray-200 text-gray-400" : ""}`}
          disabled={!!copilotId || urlIsReadOnly}
        />
      </div>
      <div className="mb-3">
        <label
          className="block text-gray-500 text-sm font-normal mb-2"
          htmlFor="name"
        >
          Your copilot&apos;s name
        </label>
        <input
          id="name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Copilot"
          className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-3">
        <label className="block text-gray-500 text-sm font-normal mb-2">
          Choose a color:
        </label>
        <div className="flex space-x-2">
          {predefinedColors.map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-lg ${selectedColor === color ? "border-2" : "border-1"} ${selectedColor === color ? "border-blue-500" : "border-grey-500"}`}
              style={{ backgroundColor: color }}
              onClick={(e) => {
                e.preventDefault();
                handleColorChange(color);
              }}
            />
          ))}
        </div>
      </div>
      <div className="mb-3">
        <label className="block text-gray-500 text-sm font-normal mb-2">
          Or enter a custom color:
        </label>
        <input
          type="text"
          value={customColor}
          onChange={handleCustomColorChange}
          placeholder="#000000"
          className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </>
  );
};

export default CopilotForm;
