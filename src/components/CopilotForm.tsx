import classNames from "classnames";

const CopilotForm = ({
  url,
  title,
  predefinedColors,
  selectedColor,
  customColor,
  copilotId,
  allReadyOnly,
  urlIsReadOnly,
  setUrl,
  setTitle,
  handleColorChange,
  handleCustomColorChange,
}: {
  url: string;
  title: string;
  predefinedColors: { hex: string; name: string }[];
  selectedColor: string;
  customColor: string;
  copilotId: string | null;
  allReadyOnly?: boolean;
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
          disabled={!!copilotId || urlIsReadOnly || allReadyOnly}
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
          disabled={allReadyOnly}
        />
      </div>
      <div className="mb-3">
        <label className="block text-gray-500 text-sm font-normal mb-2">
          Choose a color:
        </label>
        <div className="flex space-x-2">
          {predefinedColors.map((color) => (
            <label
              htmlFor={color.name}
              key={color.hex}
              className={classNames(
                "w-8 h-8 rounded-lg cursor-pointer flex items-center justify-center",
                {
                  "border-2 border-blue-500": selectedColor === color.hex,
                  "border-1 border-gray-500": selectedColor !== color.hex,
                },
              )}
              style={{ backgroundColor: color.hex }}
            >
              <input
                type="radio"
                name="color"
                id={color.name}
                value={color.hex}
                checked={selectedColor === color.hex}
                onChange={() => handleColorChange(color.hex)}
                className="sr-only"
                disabled={allReadyOnly}
                aria-label={`Select ${color.name}`}
              />
            </label>
          ))}
        </div>
      </div>
      <div className="mb-3">
        <label
          htmlFor="custom-color"
          className="block text-gray-500 text-sm font-normal mb-2"
        >
          Or enter a custom color:
        </label>
        <input
          id="custom-color"
          type="text"
          value={customColor}
          onChange={handleCustomColorChange}
          placeholder="#000000"
          disabled={allReadyOnly}
          className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </>
  );
};

export default CopilotForm;
